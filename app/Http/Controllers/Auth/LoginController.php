<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        try {
            $request->validate([
                'username' => 'required',
                'password' => 'required'
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'error' => $e->errors()
            ]);
        }

        $user = User::where('username', $request->input('username'))->first();

        if (!$user) {
            return response()->json([
                'error' => 'No user with that username found!'
            ], 404);
        } else if(!Hash::check($request->input('password'), $user->password)) {
            return response()->json([
                'error' => 'Username or password incorrect!',
                'password' => $request->input('password')
            ], 403);
        } else {
            return response()->json([
                'user' => $user
            ]);
        }

    }
}
