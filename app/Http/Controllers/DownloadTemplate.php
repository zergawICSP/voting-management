<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DownloadTemplate extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $file = public_path() . '/downloads/template.xlsx';

        return response()->download($file);
    }
}
