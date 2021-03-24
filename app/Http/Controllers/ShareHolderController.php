<?php

namespace App\Http\Controllers;

use App\Models\ShareHolder;
use Carbon\Carbon;
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
        $shareholders = ShareHolder::all();

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
                'subscribed_shares' => 'required|integer',
                'paidup_shares' => 'required|integer',
                'total_share_value' => 'required|numeric',
                'total_paidup_share_value' => 'required|numeric',
                'service_charge' => 'required|numeric',
                'service_charge_transaction' => 'required|unique:share_holders',
                'nationality' => 'required',
                'phone' => 'nullable',
                'city' => 'nullable',
                'subcity' => 'nullable',
                'woreda_kebele' => 'nullable',
                'bank_name' => 'required',
                'gender' => 'required'
            ]);            
        } catch(ValidationException $e) {
            return response()->json([
                'error' => $e->errors()
            ]);
        }

        
        try {
            $shareholder = ShareHolder::create([
                'name' => $request->input('name'),
                'subscribed_shares' => $request->input('subscribed_shares'),
                'paidup_shares' => $request->input('paidup_shares'),
                'total_share_value' => $request->input('total_share_value'),
                'total_paidup_share_value' => $request->input('total_paidup_share_value'),
                'service_charge' => $request->input('service_charge'),
                'service_charge_transaction' => $request->input('service_charge_transaction'),
                'nationality' => $request->input('nationality'),
                'phone' => $request->input('phone'),
                'city' => $request->input('city'),
                'subcity' => $request->input('subcity'),
                'woreda_kebele' => $request->input('woreda_kebele'),
                'bank_name' => $request->input('bank_name'),
                'gender' => $request->input('gender')
            ]);
        } catch(Exception $e) {
            return response()->json([
                'error' => $e
            ], 500);
        }

        return response()->json([
            'shareholder' => $shareholder
        ], 201);
        
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
        try {
            $request->validate([
                'name' => 'required',
                'subscribed_shares' => 'required|integer',
                'paidup_shares' => 'required|integer',
                'total_share_value' => 'required|numeric',
                'total_paidup_share_value' => 'required|numeric',
                'service_charge' => 'required|numeric',
                'service_charge_transaction' => 'required|unique:share_holders,service_charge_transaction,'. $shareholder->id .',id' ,
                'nationality' => 'required',
                'phone' => 'nullable',
                'city' => 'nullable',
                'subcity' => 'nullable',
                'woreda_kebele' => 'nullable',
                'bank_name' => 'required',
                'gender' => 'required'
            ]);            
        } catch(ValidationException $e) {
            return response()->json([
                'error' => 'Some fields must be filled!',
                'error_message' => $e->errors()
            ], 400);
        }

        try {
            $shareholder->update([
                'name' => $request->input('name'),
                'subscribed_shares' => $request->input('subscribed_shares'),
                'paidup_shares' => $request->input('paidup_shares'),
                'total_share_value' => $request->input('total_share_value'),
                'total_paidup_share_value' => $request->input('total_paidup_share_value'),
                'service_charge' => $request->input('service_charge'),
                'service_charge_transaction' => $request->input('service_charge_transaction'),
                'nationality' => $request->input('nationality'),
                'phone' => $request->input('phone'),
                'city' => $request->input('city'),
                'subcity' => $request->input('subcity'),
                'woreda_kebele' => $request->input('woreda_kebele'),
                'bank_name' => $request->input('bank_name'),
                'gender' => $request->input('gender')
            ]);
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }

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
    public function destroy(ShareHolder $shareholder)
    {
        try {
            $shareholder->delete();
        } catch (Exception $e) {
            return response()->json([
                'errors' => "There was a problem deleting the shareholder!",
                'error_message' => $e->getMessage()
            ], 500);
        } 

        return response()->json([
            'success' => true
        ]);
    }
}
