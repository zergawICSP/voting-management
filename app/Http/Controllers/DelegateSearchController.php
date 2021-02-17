<?php

namespace App\Http\Controllers;

use App\Models\Delegate;
use Illuminate\Http\Request;

class DelegateSearchController extends Controller
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

        if(is_numeric($request->query('q'))) {
            $delegate = [];
            
            if(Delegate::find($query)) {
                array_push($delegate, Delegate::find($query));
            }

            return response()->json([
                'delegatess' => $delegate
            ]);
        }
        $delegates = Delegate::where('name', 'LIKE', "%$query%")->get();

        $delegates->each(function($delegates) {
            $delegates->name = trim($delegates->name);
        });

        $dg=[];

        foreach ($delegates as $delegates) {            
            array_push($dg, $delegates);            
        }

        return response()->json([
            'delegatess' => $dg
        ]);
    }
}
