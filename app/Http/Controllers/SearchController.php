<?php

namespace App\Http\Controllers;

use App\Models\ShareHolder;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $query = $request->query('q');
        $shareholders = ShareHolder::where('name', 'LIKE', "%$query%")->get();

        $shareholders->each(function($shareholder) {
            $shareholder->name = trim($shareholder->name);
        });

        $sh=[];

        foreach ($shareholders as $shareholder) {
            if (!$shareholder->is_present) {
                array_push($sh, $shareholder);
            }
        }

        return response()->json([
            'shareholders' => $sh
        ]);
    }
}
