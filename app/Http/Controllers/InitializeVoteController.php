<?php

namespace App\Http\Controllers;

use App\Models\MeetingAgenda;
use App\Models\ShareHolder;
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

        foreach ($attendedShareholders as $attendedShareholder ) {
            $meetingAgenda->yes += $attendedShareholder->no_of_shares;
            $meetingAgenda->is_intialized = true;
        }
        
        try {
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
}
