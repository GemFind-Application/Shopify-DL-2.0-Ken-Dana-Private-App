<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuotedProducts extends Model
{
    protected $table = 'quoted_products';

    protected $fillable = [
        'shop',
        'product_id',
        'session_id',
        'quantity',
        'name',
        'email',
        'message',
    ];

    protected $hidden = [
        'created_at', 'updated_at',
    ];
}