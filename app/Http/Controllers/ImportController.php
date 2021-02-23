<?php

namespace App\Http\Controllers;

use App\Imports\ShareholdersImport;
use App\Imports\UserImport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Excel as ExcelExcel;
use Maatwebsite\Excel\Facades\Excel;

class ImportController extends Controller
{
    public function importShareholders(Request $request)
    {
        if (Excel::import(new ShareholdersImport, $request->file('shareholders'), null, ExcelExcel::CSV)) {
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
}
