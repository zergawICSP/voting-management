<?php

namespace App\Http\Controllers;

use App\Exports\AgendaExport;
use App\Exports\CandidateExport;
use App\Exports\ShareholderExport;

class ExportController extends Controller
{
    public function shareholdersExport()
    {
        return new ShareholderExport;
    }
    public function candidateExport()
    {
        return new CandidateExport;
    }
    public function meetingAgendaExport()
    {
        return new AgendaExport;
    }
}
