<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailSettings extends Model
{
    protected $table = 'lm_quote_settings';

    protected $fillable = [
        'shop',
        'email_json',
        'email_html',
    ];

    protected $hidden = [
        'created_at', 'updated_at',
    ];
}