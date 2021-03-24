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
        $shareholders = ShareHolder::all([
            'id',
            'name',
            'subscribed_shares',
            'total_share_value',
            'total_paidup_share_value',
            'service_charge',
            'service_charge_transaction',
            'nationality',
            'phone',
            'city',
            'subcity',
            'woreda_kebele',
            'bank_name',
            'gender'
        ]);

        ini_set('memory_limit', -1);

        return $shareholders;
    }

    

    public function headings(): array
    {
        $headings = [
            'id',
            'name',
            'subscribed_shares',
            'total_share_value',
            'total_paidup_share_value',
            'service_charge',
            'service_charge_transaction',
            'nationality',
            'phone',
            'city',
            'subcity',
            'woreda_kebele',
            'bank_name',
            'gender'            
        ];
        return $headings;
    }
}
