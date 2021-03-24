<?php

namespace App\Http\Controllers;

use App\Imports\AgendaImport;
use App\Imports\ShareHolders;
use App\Imports\ShareholdersImport;
use App\Imports\UserImport;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Maatwebsite\Excel\Excel as ExcelExcel;
use Maatwebsite\Excel\Facades\Excel;

class ImportController extends Controller
{
    public function importShareholders(Request $request)
    {
        try {
            $request->validate([
                'shareholders' => 'required|file'
            ]);
        } catch(ValidationException $e) {
            return response()->json([
                'error' => $e->errors()
            ], 400);
        }
        if (Excel::import(new Shareholders, $request->file('shareholders'), null, ExcelExcel::XLSX)) {
            return response()->json([
                'success' => true
            ]);
        } else {
            return response()->json([
                'error' => 'uploading failed'
            ], 500);
        }
    }
    public function importUsers(Request $request)
    {
        if (Excel::import(new UserImport, $request->file('users'), null, ExcelExcel::CSV)) {
            return response()->json([
                'success' => true
            ]);
        } else {
            return response()->json([
                'error' => 'uploading failed'
            ], 500);
        }
    }
    public function importMeetingAgendas(Request $request)
    {
        if (Excel::import(new AgendaImport, $request->file('meeting-agendas'), null, ExcelExcel::CSV)) {
            return response()->json([
                'success' => true
            ]);
        } else {
            return response()->json([
                'error' => 'uploading failed'
            ], 500);
        }
    }
}
