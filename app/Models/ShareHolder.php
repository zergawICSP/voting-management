<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShareHolder extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function delegate()
    {
        return $this->belongsTo(Delegate::class);
    }

    public function meetingAgendas()
    {
        return $this->belongsToMany(MeetingAgenda::class);
    }
}
