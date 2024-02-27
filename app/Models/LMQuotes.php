<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LMQuotes extends Model
{
    protected $table = 'quoted_products_admin';

    public $timestamps = false;

    protected $fillable = [
        'shop',
        'product_id',
        'quantity',
        'name',
        'email',
        'message'
    ];

    protected $hidden = [
        'created_at', 'updated_at',
    ];
}