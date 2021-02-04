<?php

namespace App\Http\Controllers;

use App\Models\ShareHolder;
use Illuminate\Http\Request;

class BarcodeScanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $shareHolders = ShareHolder::where('barcode', $request->input('barcode'))->get();

        return response()->json([
            'shareHolders' => $shareHolders
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ShareHolder  $shareHolder
     * @return \Illuminate\Http\Response
     */
    public function show(ShareHolder $shareHolder)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ShareHolder  $shareHolder
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ShareHolder $shareHolder)
    {
        //
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
