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

        return response()->json([
            'no_of_attendants' => count($attendedShareholders)
        ]);
    }
}
