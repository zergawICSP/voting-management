<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Delegate extends Model
{
    use HasFactory;
    
    protected $guarded = [];

    public function shareHolders()
    {
        return $this->hasMany(ShareHolder::class);
    }
}
