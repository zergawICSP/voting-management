<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\ShareHolder;
use Exception;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, Candidate $candidate) 
    {
        $no_of_shares = $request->input('no_of_shares');
        (integer) $no_of_shares;
        $candidate->no_of_votes = $candidate->no_of_votes + $no_of_shares;

        return response()->json([
            'no_of_votes' => $candidate->no_of_votes
        ]);
    }
}
