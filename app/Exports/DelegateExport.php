<?php

namespace App\Exports;

use App\Models\MeetingAgenda;
use App\Models\Delegate;
use Illuminate\Contracts\Support\Responsable;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Excel;

class DelegateExport implements FromCollection, WithHeadings, ShouldAutoSize, Responsable
{
    use Exportable;
    /**
    * @return \Illuminate\Support\Collection
    */
    private $fileName = 'delegates.xlsx';

    private $writerType = Excel::XLSX;

    private $headers = [
        'Content-Type' => 'text/csv',
    ];
    public function collection()
    {
        $delegates = Delegate::all(['id', 'name', 'is_present', 'barcode']);

        // ini_set('memory_limit', -1);

        $delegates->each(function($delegate){
            $delegate->name = trim($delegate->name);
            if ($delegate->is_present) {
                $delegate->is_present = 'Present';
            }else
            {
                $delegate->is_present = 'Absent';
            }
            $meetingAgendas = MeetingAgenda::all();
            foreach($meetingAgendas as $meetingAgenda) {
               if(!$delegate->meetingAgendas->find($meetingAgenda->id)){
                    $delegate->$meetingAgenda = '-';
               } else {
                   $delegate->$meetingAgenda = $delegate->meetingAgendas->find($meetingAgenda->id)->pivot->answer;
               }
            }
        });

        return $delegates;
    }
    public function headings(): array
    {
        $headings = [
            'id',
            'name',
            'is present',
            'barcode'            
        ];
        foreach(MeetingAgenda::all() as $agenda) {
            array_push($headings, $agenda->title);
        }
        return $headings;
    }
}
