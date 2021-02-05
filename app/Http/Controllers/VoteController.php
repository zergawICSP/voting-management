<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Delegate;
use App\Models\MeetingAgenda;
use App\Models\ShareHolder;
use App\Models\VotingAgenda;
use Illuminate\Http\Request;

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
        $shareholder = ShareHolder::where('barcode', $request->input('barcode'))->first();
        $chosenCandidates = $request->input('candidates');

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

            $delegatedSh = $delegate->shareholders; // Get The Shareholders for the delegations

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
                    'error' => "$shareholder->name has already voted has already voted for this agenda"
                ], 400);
            }
        }


        foreach ($chosenCandidates as $chosenCandidate) {
            $candidate = Candidate::find($chosenCandidate);
            $candidate->no_of_votes += $shareholder->no_of_shares;
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
        $shareholder = ShareHolder::where('barcode', $request->input('barcode'))->first();

        foreach ($shareholder->meetingAgendas as $agenda) {
            if ($agenda->id === $meetingAgenda->id) {
                return response()->json([
                    'error' => "$shareholder->name has already voted for this agenda"
                ], 400);
            }
        }

        if($request->input('yesField') && !$request->input('noField') && !$request->input('neutralField'))
        {
            $meetingAgenda->yes += $shareholder->no_of_shares;
            $meetingAgenda->save();

            $shareholder->meetingAgendas()->attach($meetingAgenda);

            return response()->json([
                'success' => true
            ]);
        }
        if(!$request->input('yesField') && $request->input('noField') && !$request->input('neutralField'))
        {
            $meetingAgenda->no += $shareholder->no_of_shares;
            $meetingAgenda->save();

            $shareholder->meetingAgendas()->attach($meetingAgenda);

            return response()->json([
                'success' => true
            ]);
        }
        if(!$request->input('yesField') && !$request->input('noField') && $request->input('neutralField'))
        {
            $meetingAgenda->neutral += $shareholder->no_of_shares;
            $meetingAgenda->save();

            $shareholder->meetingAgendas()->attach($meetingAgenda);

            return response()->json([
                'success' => true
            ]);
        }
    }
}
