<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VotingAgenda extends Model
{
    use HasFactory;

    protected $guaded = [];

    public function candidates()
    {
        return $this->hasMany(Candidate::class);
    }
}
