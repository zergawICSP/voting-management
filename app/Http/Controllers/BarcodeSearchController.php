<?php

namespace App\Http\Controllers;

use App\Models\ShareHolder;
use Illuminate\Http\Request;

class BarcodeSearchController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $shareholder = ShareHolder::where('barcode', $request->query('barcode'))->get()->first();

        return response()->json([
            'shareholder' => $shareholder
        ]);
    }
}
