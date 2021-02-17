<?php

namespace App\Http\Controllers;

use App\Models\Delegate;
use App\Models\MeetingAgenda;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

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

        try {
            $delegate->is_present = true;
            $delegate->barcode = $request->input('barcode');
            $delegate->attended_time = Carbon::now();
            $shareholders = $delegate->shareHolders;        

            $shareholders->each(function ($shareholder) {
                $shareholder->is_present = true;
                $meetingAgendas = MeetingAgenda::all();
                
                foreach ($meetingAgendas as $meetingAgenda ) {
                    $meetingAgenda->yes += $shareholder->no_of_shares;
                    $meetingAgenda->save();
                }

                $shareholder->save();

            
            });

            $delegate->save();

            return response()->json([
                'success' => true
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Server Error',
                'exception' => $e->getMessage()
            ], 500);
        }
    }
}
