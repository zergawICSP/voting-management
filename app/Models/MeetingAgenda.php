<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MeetingAgenda extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function shareHolders()
    {
        return $this->belongsToMany(ShareHolder::class)->withPivot(['answer', 'user_id']);
    }
}
