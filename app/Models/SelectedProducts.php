<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SelectedProducts extends Model
{
    protected $table = 'selected_products';

    protected $fillable = [
        'shop',
        'product_ids',
        'theme_id',
        'product_type'
    ];

    protected $hidden = [
        'created_at', 'updated_at',
    ];
}
