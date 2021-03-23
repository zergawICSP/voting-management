<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ShareHolder extends Model
{
    use HasFactory, SoftDeletes;
    protected $guarded = [];

    public function delegate()
    {
        return $this->belongsTo(Delegate::class);
    }

    public function meetingAgendas()
    {
        return $this->belongsToMany(MeetingAgenda::class)->withPivot(['answer', 'user_id']);
    }
    public function votingAgendas()
    {
        return $this->belongsToMany(VotingAgenda::class);
    }

    public function candidates()
    {
        return $this->belongsToMany(Candidate::class);
    }
}
