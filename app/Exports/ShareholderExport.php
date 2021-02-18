<?php

namespace App\Exports;

use App\Models\MeetingAgenda;
use App\Models\ShareHolder;
use Illuminate\Contracts\Support\Responsable;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Excel;

class ShareholderExport implements FromCollection, WithHeadings, ShouldAutoSize, Responsable
{
    use Exportable;
    /**
    * @return \Illuminate\Support\Collection
    */
    private $fileName = 'shareholders.xlsx';

    private $writerType = Excel::XLSX;

    private $headers = [
        'Content-Type' => 'text/csv',
    ];

    public function collection()
    {
        $shareholders = ShareHolder::all(['id', 'name', 'no_of_shares','phone', 'is_present', 'delegate_id', 'barcode']);

        $shareholders->each(function($shareholder){
            $shareholder->name = trim($shareholder->name);
            $shareholder->phone = $shareholder->phone;
            if($shareholder->delegate) {
                $shareholder->delegate_id = $shareholder->delegate->name;
            }
            if ($shareholder->is_present) {
                $shareholder->is_present = 'Present';
            }else
            {
                $shareholder->is_present = 'Absent';
            }
            $meetingAgendas = MeetingAgenda::all();
            foreach($meetingAgendas as $meetingAgenda) {
               if(!$shareholder->meetingAgendas->find($meetingAgenda->id)){
                    $shareholder->$meetingAgenda = '-';
               } else {
                   $shareholder->$meetingAgenda = $shareholder->meetingAgendas->find($meetingAgenda->id)->pivot->answer;
               }
            }
        });

        return $shareholders;
    }

    

    public function headings(): array
    {
        $headings = [
            'id',
            'name',
            'no of shares', 
            'phone',
            'is present',
            'delegate',
            'barcode'            
        ];
        foreach(MeetingAgenda::all() as $agenda) {
            array_push($headings, $agenda->title);
        }
        return $headings;
    }
}
