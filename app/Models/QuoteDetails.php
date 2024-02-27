<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuoteDetails extends Model
{
    use HasFactory;

    protected $table = 'quote_details_admin';

    protected $fillable = [
        'quote_id',
        'product_id',
        'quantity',
        'price',
        'currency',
    ];

    protected $hidden = [
    ];
}