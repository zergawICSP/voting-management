<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Delegate;
use App\Models\MeetingAgenda;
use App\Models\ShareHolder;
use App\Models\VotingAgenda;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class VoteController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function votingAgenda(Request $request, VotingAgenda $votingAgenda) 
    {
        try {
            $request->validate([
                'barcode' => 'required',
                'candidates' => 'required|array|min:1'
            ]);
        } 
        
        catch (ValidationException $e) {
            return response()->json([
                'error' => 'Barcode Field must be Filled and At Least One Candidate must be chosen',
                'exception' => $e->errors()
            ], 400);
        }


        $shareholder = ShareHolder::where('barcode', $request->input('barcode'))->first();
        $chosenCandidates = $request->input('candidates');


        if(!$chosenCandidates || count($chosenCandidates) == 0) {
            return response()->json([
                'error' => 'At least one candidate must be choosen'
            ], 400);
        }


        // Check if Shareholder is Empty and Search Barcode in Delegates Table.

        if (!$shareholder) 
        {
            $delegate = Delegate::where('barcode', $request->input('barcode'))->first();

            if(!$delegate) {
                return response()->json([
                    'error' => "No barcode with $request->barcode exist" 
                ], 404);
            } 

            /* Go through the delegate voting history
            to check if the delegate has already voted on the agenda or not */

            foreach ($delegate->votingAgendas as $agenda) {
                if ($agenda->id === $votingAgenda->id) {
                    return response()->json([
                        'error' => "$delegate->name has already voted for this agenda"
                    ], 400);
                }
            }

            $delegatedSh = $delegate->shareholders; // Get The delegated shareholders



            /* Update candidate number of votes for each shareholders under
            the delegate and save the related vote and share holder on 
            the pivot table */

            foreach ($delegatedSh as $dlg) {
                foreach ($chosenCandidates as $chosenCandidate) {
                    $candidate = Candidate::lockForUpdate()->find($chosenCandidate);
                    $candidate->no_of_votes += $dlg->no_of_shares;
                    $candidate->save();
                    $candidate->shareholders()->attach($dlg);
                }

                
                $votingAgenda->shareholders()->attach($dlg->id);
            }


            $delegate->votingAgendas()->attach($votingAgenda);
            return response()->json([
                'success' => true
            ]);

        }


        /* Check if shareholder is delegated or not
         To count or not count the vote */


        if($shareholder->delegate_id !== null && $shareholder->delegate_id !== 0)
        {
            return response()->json([
                'error' => "$shareholder->name is already delegated" 
            ], 400);
        }

        /* Go through the shareholders voting history
        to check if the shareholder has already voted on the agenda or not */

        foreach ($shareholder->votingAgendas as $agenda) {
            if ($agenda->id === $votingAgenda->id) {
                return response()->json([
                    'error' => "$shareholder->name has already voted for this agenda"
                ], 400);
            }
        }


        /* Go through the candidates the shareholder voted for and add their 
        number of shares to the candidates number of votes */

        foreach ($chosenCandidates as $chosenCandi) {
            try {
                $candidate = Candidate::lockForUpdate()->find($chosenCandi);
                $candidate->no_of_votes += $shareholder->no_of_shares;
            } catch(Exception $e) {
                return response()->json([
                    'error' => 'One or More invalid shareholder',
                    'exception' => $e->getMessage()
                ]);
            }
            $candidate->save();
            $candidate->shareholders()->attach($shareholder);
        }


        $votingAgenda->shareholders()->attach($shareholder);


        return response()->json([
            'success' => true
        ]);
    }


    public function meetingAgenda(Request $request, MeetingAgenda $meetingAgenda)
    {
        try {
            $request->validate([
                'barcode' => 'required',
                'userID' => 'required'
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'error' => 'Barcode Field is Required!!!',
                'exception' => $e->errors()
            ], 400);
        }

        if(!$meetingAgenda->is_initialized) {
            return response()->json([
                'error' => 'Meeting Agenda is not yet initialized!!!'
            ], 400);
        }
        $shareholder = ShareHolder::where('barcode', $request->input('barcode'))->first();
        MeetingAgenda::where('id', $meetingAgenda)->sharedLock();

        ini_set('memory_limit', -1);
        
        if(!$shareholder) {
            $delegate = Delegate::where('barcode', $request->input('barcode'))->first();

            $attendedTime = Carbon::createFromTimeString($delegate->attended_time);
            $initialized_time = Carbon::createFromTimeString($meetingAgenda->initialized_time);

            if($attendedTime->greaterThan($initialized_time)) {
                return response()->json([
                    'error' => "$delegate->name came after agenda was initialized!"
                ], 400);
            }

            $shareholders = $delegate->shareholders;

            foreach($shareholders as $shareholder) {
                foreach ($shareholder->meetingAgendas as $agenda) {
                    if($agenda->pivot->user_id !== 0) {
                        return response()->json([
                            'error' => "$delegate->name has already voted for this agenda"
                        ], 400);
                    }
                }
            }

            
            if($request->input('noField') && !$request->input('neutralField') && !$request->input('yesField'))
            {
                
                $totalShare = DB::table('share_holders')->select(DB::raw('sum(no_of_shares) as total_share'))->where('delegate_id', $delegate->id)->get();
                $totalShare = (int)$totalShare[0]->total_share + $delegate->no_of_shares;
                $meetingAgenda->yes -= $totalShare;
                $meetingAgenda->no += $totalShare;
                $meetingAgenda->shareHolders()->detach($shareholders);
                $meetingAgenda->shareHolders()->attach($shareholders, ['answer' => 'እቃወማለሁ', 'user_id' => $request->input('userID')]);
                try {
                    $meetingAgenda->save();

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
            if(!$request->input('noField') && $request->input('neutralField') && !$request->input('yesField'))
            {
                $totalShare = DB::table('share_holders')->select(DB::raw('sum(no_of_shares) as total_share'))->where('delegate_id', $delegate->id)->get();
                $totalShare = (int)$totalShare[0]->total_share + $delegate->no_of_shares;
                $meetingAgenda->yes -= $totalShare;
                $meetingAgenda->neutral += $totalShare;
                $meetingAgenda->shareHolders()->detach($shareholders);
                $meetingAgenda->shareHolders()->attach($shareholders, ['answer' => 'ድምጸ ተዐቅቦ', 'user_id' => $request->input('userID')]);
                try {
                    $meetingAgenda->save();


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
            if(!$request->input('noField') && !$request->input('neutralField') && $request->input('yesField'))
            {
                $meetingAgenda->shareHolders()->detach($shareholders);
                $meetingAgenda->shareHolders()->attach($shareholders, ['answer' => 'እደግፋለሁ', 'user_id' => $request->input('userID')]);
                
                try {

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

            return response()->json([
                'error' => 'Exactly One Field Must Be Checked!'
            ], 400);
            
            
        } else {
            foreach ($shareholder->meetingAgendas as $agenda) {
                if ($agenda->pivot->user_id !== 0 && $agenda === $meetingAgenda) {
                    return response()->json([
                        'error' => "$shareholder->name has already voted for this agenda"
                    ], 400);
                }
            }
            $attendedTime = Carbon::createFromTimeString($shareholder->attended_time);
            $initialized_time = Carbon::createFromTimeString($meetingAgenda->initialized_time);

            if($attendedTime->greaterThan($initialized_time)) {
                return response()->json([
                    'error' => "$shareholder->name came after agenda was initialized!"
                ], 400);
            }
            if($request->input('noField') && !$request->input('neutralField') && !$request->input('yesField'))
            {
                $meetingAgenda->yes -= $shareholder->no_of_shares;
                $meetingAgenda->no += $shareholder->no_of_shares;
                try {
                    $meetingAgenda->save();
                    $meetingAgenda->shareHolders()->detach($shareholder);
                    $meetingAgenda->shareHolders()->attach($shareholder, ['answer' => 'እቃወማለሁ', 'user_id' => $request->input('userID')]);


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
            if(!$request->input('noField') && $request->input('neutralField') && !$request->input('yesField'))
            {
                $meetingAgenda->yes -= $shareholder->no_of_shares;
                $meetingAgenda->neutral += $shareholder->no_of_shares;
                try {
                    $meetingAgenda->save();
                    $meetingAgenda->shareHolders()->detach($shareholder);
                    $meetingAgenda->shareHolders()->attach($shareholder, ['answer' => 'ድምጸ ተዐቅቦ', 'user_id' => $request->input('userID')]);


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
            if(!$request->input('noField') && !$request->input('neutralField') && $request->input('yesField'))
            {
                try {
                    $meetingAgenda->shareHolders()->detach($shareholder);
                    $meetingAgenda->shareHolders()->attach($shareholder, ['answer' => 'እደግፋለሁ', 'user_id' => $request->input('userID')]);


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

            return response()->json([
                'error' => 'Exactly One Field Must Be Checked!'
            ], 400);
            }
    }
}
