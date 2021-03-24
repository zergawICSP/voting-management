<?php

namespace App\Imports;

use App\Models\ShareHolder;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Imports\HeadingRowFormatter;

// use Maatwebsite\Excel\Imports\HeadingRowFormatter;


class ShareHolders extends HeadingRowFormatter implements ToModel, WithHeadingRow
{
    use Importable;
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new ShareHolder([
            'id' => $row['no'],
            'name' => $row['name_of_shareholder'],
            'subscribed_shares' =>  $row['no_of_shares_subscribed'],
            'paidup_shares' => $row['no_of_shares_paidup'],
            'total_share_value' => $row['total_value_of_shares_subscribed'],
            'total_paidup_share_value' => $row['total_value_of_shares_paidup'],
            'service_charge' => $row['service_charge'],
            'service_charge_transaction' => $row['service_charge_transaction'],
            'nationality' => $row['nationality'],
            'phone' => $row['telephone'] ?? null,
            'city' => $row['city'] ?? null,
            'subcity' => $row['subcity'] ?? null,
            'woreda_kebele' => $row['w/k'] ?? null,
            'bank_name' => $row['bank_name'],
            'gender' => $row['gender']
        ]);
    }
}
