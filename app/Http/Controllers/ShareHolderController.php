<?php

namespace App\Http\Controllers;

use App\Models\ShareHolder;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ShareHolderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $shareholders = ShareHolder::paginate(15);

        return response()->json([
            'shareholders' => $shareholders
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
                'name' => 'required',
                'no_of_shares' => 'required|integer|min:1',
                'phone' => 'required'
            ]);            
        } catch(ValidationException $e) {
            return response()->json([
                'errors' => $e->errors()
            ]);
        }

        // if($request->delegate_id) {
        //     $shareholder = ShareHolder::create([
        //         'name' => $request->name,
        //         'no_of_shares' => 
        //     ])
        // }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ShareHolder  $shareHolder
     * @return \Illuminate\Http\Response
     */
    public function show(ShareHolder $shareholder)
    {
        // dd($shareHolder);

        return response()->json([
            'shareholder' => $shareholder
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ShareHolder  $shareHolder
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ShareHolder $shareholder)
    {
        $shareholder->barcode = $request->input('barcode');
        $shareholder->save();

        return response()->json([
            'shareholder' => $shareholder
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ShareHolder  $shareHolder
     * @return \Illuminate\Http\Response
     */
    public function destroy(ShareHolder $shareHolder)
    {
        //
    }
}
