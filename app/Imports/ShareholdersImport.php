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
        ini_set('max_execution_time', 0);
        if(is_numeric($row[4])) {
            return new ShareHolder([
                // 'id' => $row[0],
                'name' => $row[1],
                'no_of_shares' => $row[2],
                'phone' => $row[3],
                'delegate_id' => $row[4]
            ]);
        }
        return new ShareHolder([
            // 'id' => $row[0],
            'name' => $row[1],
            'no_of_shares' => $row[2],
            'phone' => $row[3]
        ]);
    }
}
