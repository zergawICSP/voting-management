<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CandidateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $candidates = Candidate::all();
        

        $candidates->each(function ($candidate) {
            $candidates = Candidate::all();
            $totalVoteCount = 0;
            foreach ($candidates as $candate) {
                $totalVoteCount += $candate->no_of_votes;
            }
            $candidate->votingAgenda;
            if ($totalVoteCount !== 0)
            {
                $candidate->votePercentage = $candidate->no_of_votes / $totalVoteCount;
            } else {
                $candidate->votePercentage = 0;
            }
            
        });

        return response()->json([
            'candidates' => $candidates
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                "name" => "required",
                "phone" => "required|unique:candidates"
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'error' => $e->errors()
            ], 404);
        }
        $candidate = Candidate::create([
            "name" => $request->name,
            "phone" => $request->phone
        ]);

        return response()->json([
            'candidate' => $candidate
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Candidate  $candidate
     * @return \Illuminate\Http\Response
     */
    public function show(Candidate $candidate)
    {
        $agenda = $candidate->votingAgenda();
        return response()->json([
            "candidate" => $candidate,
            "agenda" => $agenda
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Candidate  $candidate
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Candidate $candidate)
    {
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Candidate  $candidate
     * @return \Illuminate\Http\Response
     */
    public function destroy(Candidate $candidate)
    {
        //
    }
}
