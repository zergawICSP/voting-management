<?php

namespace App\Http\Controllers;

use App\Models\MeetingAgenda;
use App\Models\ShareHolder;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class MeetingAgendaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $meetingAgendas = MeetingAgenda::all();

        

        $meetingAgendas->each(function ($meetingAgenda) {
            if ($meetingAgenda->yes + $meetingAgenda->no + $meetingAgenda->neutral > 0){
                $meetingAgenda->yesPercentage = $meetingAgenda->yes / ($meetingAgenda->yes + $meetingAgenda->no + $meetingAgenda->neutral);
                $meetingAgenda->noPercentage = $meetingAgenda->no / ($meetingAgenda->yes + $meetingAgenda->no + $meetingAgenda->neutral);
                $meetingAgenda->neutralPercentage = $meetingAgenda->neutral / ($meetingAgenda->yes + $meetingAgenda->no + $meetingAgenda->neutral);
            } else {
                $meetingAgenda->yesPercentage = 0;
                $meetingAgenda->noPercentage = 0;
                $meetingAgenda->neutralPercentage = 0;
            }            
        });

        return response()->json([
            'agendas' => $meetingAgendas
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
                'title' => 'required',
                'description' => 'nullable'
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'error' => "Title field must be at least 10 characters",
                'exception' => $e->errors()
            ], 400);
        }

        if(!$request->input('description')) {
            try {
                $meetingAgenda = MeetingAgenda::create([
                    'title' => $request->input('title')
                ]);
                return response()->json([
                    '$meetingAgenda' => $meetingAgenda
                ], 201);
            } catch(Exception $e) {
                return response()->json([
                    'error' => 'Server Error',
                    'exception' => $e->getmessage()
                ], 500);
            }
        } else {
            try {
                $meetingAgenda = MeetingAgenda::create([
                    'title' => $request->input('title'),
                    'description' => $request->input('description')
                ]);
                return response()->json([
                    '$meetingAgenda' => $meetingAgenda
                ], 201);
            } catch(Exception $e) {
                return response()->json([
                    'error' => 'Server Error',
                    'exception' => $e->getmessage()
                ], 500);
            }
        }

        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MeetingAgenda  $meetingAgenda
     * @return \Illuminate\Http\Response
     */
    public function show(MeetingAgenda $meetingAgenda)
    {
        $shareholders = ShareHolder::all();
        $totalVote = $meetingAgenda->yes + $meetingAgenda->no + $meetingAgenda->neutral;
        $totalShare = 0;

        foreach($shareholders as $shareholder) {
            $totalShare += $shareholder->no_of_shares;
        }

        

        if ($totalVote !== 0 && $totalShare !== 0) {
            $meetingAgenda->yesPercentage = ($meetingAgenda->yes / $totalVote) * 100;
            $meetingAgenda->noPercentage = ($meetingAgenda->no / $totalVote) * 100;
            $meetingAgenda->neutralPercentage = ($meetingAgenda->neutral / $totalVote) * 100;
            $meetingAgenda->koremPercentage = ($meetingAgenda->korem / $totalShare) * 100;
            $meetingAgenda->totalShare = $totalShare;
            return response()->json([
                'agenda' => $meetingAgenda
            ]);
        }

        $meetingAgenda->koremPercentage = 0;
        $meetingAgenda->yesPercentage = 0;
        $meetingAgenda->noPercentage = 0;
        $meetingAgenda->neutralPercentage = 0;
        $meetingAgenda->totalShare = $totalShare;

        return response()->json([
            'agenda' => [
                $meetingAgenda,
                $totalShare
            ]
        ]);

        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MeetingAgenda  $meetingAgenda
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, MeetingAgenda $meetingAgenda)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MeetingAgenda  $meetingAgenda
     * @return \Illuminate\Http\Response
     */
    public function destroy(MeetingAgenda $meetingAgenda)
    {
        //
    }
}
