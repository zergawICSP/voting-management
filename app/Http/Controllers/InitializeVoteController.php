<?php

namespace App\Http\Controllers;

use App\Models\MeetingAgenda;
use App\Models\ShareHolder;
use Carbon\Carbon;
use Exception;

class InitializeVoteController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(MeetingAgenda $meetingAgenda)
    {
        $attendedShareholders = ShareHolder::where('is_present', true)->get();

        if(count($attendedShareholders) === 0) {
            return response()->json([
                'error' => 'No Attendants Yet!'
            ], 400);
        } 

        if (!$meetingAgenda->is_initialized) { 
            try {
                $meetingAgenda->is_initialized = true;
                $meetingAgenda->initialized_time = Carbon::now();
                foreach ($attendedShareholders as $attendedShareholder ) {
                    $meetingAgenda->yes += $attendedShareholder->no_of_shares;
                }
                $meetingAgenda->save();
                return response()->json([
                    'success' => true
                ]);
            } catch (Exception $e) {
                return response()->json([
                    'error' => $e->getMessage()
                ], 500);
            }
        }

        return response()->json([
            'error' => 'Meeting Agenda Has Already Been Initialized'
        ], 400);

        
    }
}
