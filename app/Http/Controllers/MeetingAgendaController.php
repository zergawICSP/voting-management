<?php

namespace App\Http\Controllers;

use App\Models\MeetingAgenda;
use Illuminate\Http\Request;

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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MeetingAgenda  $meetingAgenda
     * @return \Illuminate\Http\Response
     */
    public function show(MeetingAgenda $meetingAgenda)
    {
        return response()->json([
            'agenda' => $meetingAgenda
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