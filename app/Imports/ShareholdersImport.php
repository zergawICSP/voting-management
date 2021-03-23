<?php

namespace App\Imports;

use App\Models\ShareHolder;
use Maatwebsite\Excel\Concerns\ToModel;

class ShareholdersImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        // ini_set('max_execution_time', 0);
        // ini_set('memory_limit', -1);
        // if($row[5] || $row[6] || $row[7]){
        //     if(is_numeric($row[4])) {
        //         return new ShareHolder([
        //             'id' => $row[0],
        //             'name' => $row[1],
        //             'no_of_shares' => $row[2],
        //             'phone' => $row[3],
        //             'delegate_id' => $row[4],
        //             'city' => $row[5],
        //             'subcity' => $row[6],
        //             'woreda_kebele' => $row[7]
        //         ]);
        //     }
        //     return new ShareHolder([
        //         'id' => $row[0],
        //         'name' => $row[1],
        //         'no_of_shares' => $row[2],
        //         'phone' => $row[3],
        //         'city' => $row[5],
        //         'subcity' => $row[6],
        //         'woreda_kebele' => $row[7]
        //     ]);
        // }
        if(!empty($row[4]) && is_numeric($row[4])) {
            return new ShareHolder([
                'id' => $row[0] ?? null,
                'name' => $row[1] ?? null,
                'no_of_shares' => $row[2] ?? null,
                'phone' => $row[3] ?? null,
                'delegate_id' => $row[4] ?? null,
                'city' => $row[5] ?? null,
                'subcity' => $row[6] ?? null,
                'woreda_kebele' => $row[7] ?? null
            ]);
        }
        return new ShareHolder([
            'id' => $row[0] ?? null,
            'name' => $row[1] ?? null,
            'no_of_shares' => $row[2] ?? null,
            'phone' => $row[3] ?? null,
            'city' => $row[5] ?? null,
            'subcity' => $row[6] ?? null,
            'woreda_kebele' => $row[7] ?? null
        ]);
    }
}
