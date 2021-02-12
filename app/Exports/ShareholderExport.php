<?php

namespace App\Exports;

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
        $shareholders = ShareHolder::all();

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
            $shareholder->chosenCandidate = $shareholder->candidates->pluck('english_name');
        });

        return $shareholders;
    }

    public function headings(): array
    {
        return [
            'id',
            'name',
            'no of shares', 
            'phone',
            'is present',
            'delegate',
            'barcode',
            'created_at',
            'updated_at',
            'chosenCandidate'
        ];
    }
}
