<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function votingAgenda()
    {
        return $this->belongsTo(VotingAgenda::class);
    }
    public function shareholders() {
        return $this->belongsToMany(ShareHolder::class);
    }
}
