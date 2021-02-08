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
