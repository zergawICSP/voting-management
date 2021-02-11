<?php

namespace App\Http\Controllers;

use App\Exports\CandidateExport;
use App\Exports\ShareholderExport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class ExportController extends Controller
{
    public function shareholdersExport()
    {
        return Excel::download(new ShareholderExport, 'shareholders.xlsx');
    }
    public function candidateExport()
    {
        return Excel::download(new CandidateExport, 'candidates.xlsx');
    }
}
