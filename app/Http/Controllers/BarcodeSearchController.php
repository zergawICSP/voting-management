<?php

namespace App\Http\Controllers;

use App\Models\Delegate;
use App\Models\ShareHolder;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

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
        try {
            $request->validate([
                'barcode' => 'required'
            ]);
        } catch(ValidationException $e) {
            return response()->json([
                'barcode' => 'Barcode is required!'
            ], 400);
        }
        $shareholder = ShareHolder::where('barcode', $request->query('barcode'))->get()->first();

        if(!$shareholder) {
            $delegate = Delegate::where('barcode', $request->query('barcode'))->first();
            // $delegatedShareholders = $delegate->shareholders;

            if(!$delegate) {
                return response()->json([
                    'error' => 'No Delegate or Shareholder found with this barcode'
                ], 400);
            }
            

            if(count($delegate->shareholders) > 0) {
                foreach($delegate->shareholders as $delegatedShareholder) {
                    $delegate->no_of_shares += $delegatedShareholder->no_of_shares;
                }
            }


            return response()->json([
                'shareholder' => $delegate
            ]);
        }

        return response()->json([
            'shareholder' => $shareholder
        ]);
    }
}
