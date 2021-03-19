<?php

namespace App\Imports;

use App\Models\MeetingAgenda;
use Maatwebsite\Excel\Concerns\ToModel;

class AgendaImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new MeetingAgenda([
            'id' => $row[0],
            'title' => $row[1]
        ]);
    }
}
