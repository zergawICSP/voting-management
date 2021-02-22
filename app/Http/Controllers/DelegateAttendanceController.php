<?php

namespace App\Http\Controllers;

use App\Models\Delegate;
use App\Models\MeetingAgenda;
use App\Models\ShareHolder;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\Process\Process;

class DelegateAttendanceController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, Delegate $delegate)
    {
        try {
            $request->validate([
                'barcode' => 'required|unique:delegates,barcode|unique:share_holders,barcode'
            ]);
        } catch (ValidationException $e){
            return response()->json([
                'error' => 'Barcode must be unique',
                'exception' => $e->errors()
            ], 400);
        }

        ini_set('max_execution_time', -1);
        try {
            $delegate->is_present = true;
            $delegate->barcode = $request->input('barcode');
            $delegate->attended_time = Carbon::now();
            $shareholders = $delegate->shareHolders;     
            

            // $shareholders->each(function ($shareholder) {
            //     $shareholder->is_present = true;
            //     $shareholder->save();
            // });
            ShareHolder::where('delegate_id', $delegate->id)->update(['is_present' => true]);

            
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Server Error',
                'exception' => $e->getMessage()
            ], 500);
        }
        $delegate->save();

        return response()->json([
            'success' => true
        ]);
    }
}
