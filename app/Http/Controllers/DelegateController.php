<?php

namespace App\Http\Controllers;

use App\Models\Delegate;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class DelegateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $delegates = Delegate::all();

        return response()->json([
            "delegates" => $delegates
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
                'no_of_shares' => 'nullable|integer|min:10'
            ]);
        } catch(ValidationException $e) {
            return response()->json([
                'error' => 'One or more fields need to be field',
                'error_message' => $e->errors()
            ], 400);
        }

        try {
            Delegate::create([
                'name' => $request->name,
                'no_of_shares' => $request->no_of_shares
            ]);
        } catch (QueryException $e) {
            return response()->json([
                'error' => 'An Error Occured While Creating Delegate',
                'error_message' => $e->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Delegate  $delegate
     * @return \Illuminate\Http\Response
     */
    public function show(Delegate $delegate)
    {
        $delegate->share_holders = $delegate->shareHolders;

        return response()->json([
            'delegate' => $delegate
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Delegate  $delegate
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Delegate $delegate)
    {
        try {
            $request->validate([
                'name' => 'required',
                'no_of_shares' => 'nullable|integer|min:10'
            ]);
        } catch(ValidationException $e) {
            return response()->json([
                'error' => 'One or more fields need to be field',
                'error_message' => $e->errors()
            ], 400);
        }

        try {
            $delegate->update([
                'name' => $request->name,
                'no_of_shares' => $request->no_of_shares
            ]);
        } catch(QueryException $e) {
            return response()->json([
                'error' => 'Failed To Update Delegate',
                'error_message' => $e->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true
        ]); 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Delegate  $delegate
     * @return \Illuminate\Http\Response
     */
    public function destroy(Delegate $delegate)
    {
        try {
            $delegate->delete();
        } catch (QueryException $e) {
            return response()->json([
                'error' => 'A problem occured while trying to delete this delegate!',
                'error_message' => $e->getMessage()
            ], 500);
        }

        return response()->json([
            'success' => true
        ]);
    }
}
