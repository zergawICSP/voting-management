<?php

namespace App\Http\Controllers;

use App\Models\ShareHolder;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AttendanceController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, ShareHolder $shareholder)
    {
        
        try {
            if($shareholder->delegate_id !== null && $shareholder->delegate_id !==0) {
                $delegate = $shareholder->delegate;
                $delegate->is_present = true;
                foreach ($delegate->shareholders as $shareholder) {
                    $shareholder->is_present = true;
                    $shareholder->save();
                }
                $delegate->barcode = $request->input('barcode');
                $delegate->save();
            }else {
                $shareholder->is_present = true;
                $shareholder->barcode = $request->input('barcode');
                $shareholder->save(); 
            }
        }  catch (Exception $e) {
            return response()->json([
                'error' => $e
            ], 400);
        }
        
        return response()->json([
            'success' => true
        ]);
    }
}
