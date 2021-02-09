<?php

namespace App\Http\Controllers;

use App\Models\ShareHolder;
use Illuminate\Http\Request;

class GetAllAttendantsController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke()
    {
        $attendedShareholders = ShareHolder::where('is_present', true)->get();
        $shareholders = ShareHolder::all();

        $totalShare = 0;
        
        foreach ($shareholders as $shareholder) {
            $totalShare += $shareholder->no_of_shares;
        }

        $attendedShareholderShare = 0;

        foreach ($attendedShareholders as $attendedShareholder) {
            $attendedShareholderShare += $attendedShareholder->no_of_shares;
        }

        $percentile = ($attendedShareholderShare / $totalShare) * 100;

        return response()->json([
            'no_of_attendants' => $attendedShareholderShare,
            'totalShare' => $totalShare,
            'percentage' => $percentile
        ]);
    }
}
