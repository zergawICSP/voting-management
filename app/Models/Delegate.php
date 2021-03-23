<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Delegate extends Model
{
    use HasFactory, SoftDeletes;
    
    protected $guarded = [];

    public function shareHolders()
    {
        return $this->hasMany(ShareHolder::class);
    }
    public function votingAgendas()
    {
        return $this->belongsToMany(VotingAgenda::class);
    }
    public function meetingAgendas()
    {
        return $this->belongsToMany(MeetingAgenda::class)->withPivot(['answer', 'user_id']);
    }
}
