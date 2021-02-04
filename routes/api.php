<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\BarcodeScanController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\DelegateController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ShareHolderController;
use App\Http\Controllers\VoteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('/shareholders', ShareHolderController::class)->except(['store', 'delete']);
Route::apiResource('/candidates', CandidateController::class)->only(['index', 'show']);
Route::apiResource('/delegates', DelegateController::class)->only(['index', 'show']);

Route::get('/search', SearchController::class);
Route::post('/attend/{shareholder}', AttendanceController::class);

