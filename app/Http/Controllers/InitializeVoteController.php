<?php

namespace App\Http\Controllers;

use App\Models\Delegate;
use App\Models\MeetingAgenda;
use App\Models\ShareHolder;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\DB;

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
        $attendedDelegates = Delegate::where('is_present', true)->get();

        if(count($attendedShareholders) === 0) {
            return response()->json([
                'error' => 'No Attendants Yet!'
            ], 400);
        } 

        if (!$meetingAgenda->is_initialized) { 
            try {
                $meetingAgenda->is_initialized = true;
                $meetingAgenda->initialized_time = Carbon::now();
                $totalShareholdersShare = DB::table('share_holders')->select(DB::raw('sum(no_of_shares) as total_share'))->where('is_present', true)->get();
                $totalDelegatesShare = DB::table('delegates')->select(DB::raw('sum(no_of_shares) as total_share'))->where('is_present', true)->get();
                $totalShare = (int)$totalShareholdersShare[0]->total_share + (int)$totalDelegatesShare[0]->total_share;
                $meetingAgenda->yes += $totalShare;
                $meetingAgenda->korem += $totalShare;
                
                // foreach($attendedDelegates as $attendedDelegate) {
                //     $meetingAgenda->yes += $attendedDelegate->no_of_shares;
                //     $meetingAgenda->korem += $attendedDelegate->no_of_shares;
                // }
                
                // foreach ($attendedShareholders as $attendedShareholder ) {
                //     $meetingAgenda->yes += $attendedShareholder->no_of_shares;
                //     $meetingAgenda->korem += $attendedShareholder->no_of_shares;
                    
                // }
                // $meetingAgenda->shareHolders()->attach($attendedShareholders, ['answer' => 'እደግፋለሁ', 'user_id' => 0]);
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
