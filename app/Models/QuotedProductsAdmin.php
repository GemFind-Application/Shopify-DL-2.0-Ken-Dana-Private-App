<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuotedProductsAdmin extends Model
{
    protected $table = 'quoted_products_admin';

    protected $fillable = [
        'shop',
        'product_id',
        'quantity',
        'name',
        'email',
        'message',
        'created_at',
        'updated_at',
    ];

    protected $hidden = [
    ];
}