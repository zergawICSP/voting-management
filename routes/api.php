<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\BarcodeSearchController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\DelegateAttendanceController;
use App\Http\Controllers\DelegateController;
use App\Http\Controllers\DelegateSearchController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\GetAllAttendantsController;
use App\Http\Controllers\ImportController;
use App\Http\Controllers\InitializeVoteController;
use App\Http\Controllers\MeetingAgendaController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ShareHolderController;
use App\Http\Controllers\VoteController;
use App\Http\Controllers\VotingAgendaController;
use App\Imports\UserImport;
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
// API Resource Controller Routes
Route::apiResource('/shareholders', ShareHolderController::class);
Route::apiResource('/candidates', CandidateController::class)->only(['index', 'show']);
Route::apiResource('/delegates', DelegateController::class)->only(['index', 'show']);
Route::apiResource('/meeting-agendas', MeetingAgendaController::class)->only(['index', 'show', 'store']);
Route::apiResource('/voting-agendas', VotingAgendaController::class)->only(['index']);

// Single Action Controller Routes
Route::get('/search', SearchController::class);
Route::get('/search-delegate', DelegateSearchController::class);
Route::post('/attend/{shareholder}', AttendanceController::class);
Route::post('/attend-delegate/{delegate}', DelegateAttendanceController::class);
Route::get('/barcode', BarcodeSearchController::class);
Route::get('/attendants', GetAllAttendantsController::class);
Route::post('/initialize/{meetingAgenda}', InitializeVoteController::class);

// Excel Export End-Points
Route::prefix('/export')->group(function () {
    Route::get('/shareholders', [ExportController::class, 'shareholdersExport']);
    Route::get('/delegates', [ExportController::class, 'delegateExport']);
    Route::get('/candidates', [ExportController::class, 'candidateExport']);
    Route::get('/meeting-agenda', [ExportController::class, 'meetingAgendaExport']);
});

// Excel Import End-Points
Route::prefix('/import')->group(function () {
    Route::post('/shareholders', [ImportController::class, 'importShareholders']);
    Route::post('/users', [ImportController::class, 'importUsers']);
});

// Voting Controller
Route::post('/vote/{votingAgenda}', [VoteController::class, 'votingAgenda']);
Route::post('/vote-meeting-agenda/{meetingAgenda}', [VoteController::class, 'meetingAgenda']);

// Auth Controllers
Route::post('/login', LoginController::class);
Route::post('/logout', LogoutController::class);