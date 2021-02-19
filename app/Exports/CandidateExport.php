<?php

namespace App\Exports;

use App\Models\Candidate;
use App\Models\VotingAgenda;
use Illuminate\Contracts\Support\Responsable;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Excel;

class CandidateExport implements FromCollection, WithHeadings, ShouldAutoSize, Responsable
{
    use Exportable;
    /**
    * @return \Illuminate\Support\Collection
    */
    private $fileName = 'candidates.xlsx';

    private $writerType = Excel::XLSX;

    private $headers = [
        'Content-Type' => 'text/csv',
    ];
    public function collection()
    {
        $candidates = Candidate::all();

        $candidates->each(function ($candidate) {
            $candidates = Candidate::all();
            $totalVoteCount = 0;
            foreach ($candidates as $candate) {
                
                $totalVoteCount += $candate->no_of_votes;
            }
            if($candate->voting_agenda_id) {
                $candate->voting_agenda_id = VotingAgenda::find($candate->voting_agenda_id)->title;
            }
            if ($totalVoteCount !== 0)
            {
                $candidate->votePercentage = $candidate->no_of_votes / $totalVoteCount;
            } else {
                $candidate->votePercentage = 0;
            }
            
        });
        return $candidates;
    }
    public function headings(): array
    {
        return [
            'id',
            'name',
            'english_name',
            'phone',
            'no of votes',
            'voting agenda',
            'created_at',
            'updated_at',
            'vote percentage'
        ];
    }
}
