<?php

namespace App\Exports;

use App\Models\MeetingAgenda;
use Illuminate\Contracts\Support\Responsable;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Excel;

class AgendaExport implements FromCollection, WithHeadings, Responsable, ShouldAutoSize
{
    use Exportable;
    /**
    * @return \Illuminate\Support\Collection
    */
    private $fileName = 'agendas.xlsx';

    private $writerType = Excel::XLSX;

    private $headers = [
        'Content-Type' => 'text/csv',
    ];
    public function collection()
    {
        $meetingAgendas = MeetingAgenda::all();

        $meetingAgendas->each(function ($meetingAgenda) {
            if ($meetingAgenda->yes + $meetingAgenda->no + $meetingAgenda->neutral > 0){
                $meetingAgenda->yesPercentage = $meetingAgenda->yes / ($meetingAgenda->yes + $meetingAgenda->no + $meetingAgenda->neutral);
                $meetingAgenda->noPercentage = $meetingAgenda->no / ($meetingAgenda->yes + $meetingAgenda->no + $meetingAgenda->neutral);
                $meetingAgenda->neutralPercentage = $meetingAgenda->neutral / ($meetingAgenda->yes + $meetingAgenda->no + $meetingAgenda->neutral);
            } else {
                $meetingAgenda->yesPercentage = 0;
                $meetingAgenda->noPercentage = 0;
                $meetingAgenda->neutralPercentage = 0;
            }
        });

        return $meetingAgendas;
    }
    public function headings(): array
    {
        return [
            'id',
            'title',
            'description',
            'yes count',
            'no count',
            'neutral count',
            'created_at',
            'updated_at',
            'yes percentage',
            'no percentage',
            'neutral percentage'
        ];
    }
}
