<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HidePriceSettings extends Model
{
    protected $table = 'hide_price_settings';

    protected $fillable = [
        'shop',
        'hide_price',
        'all_products_req_login',
        'quote_products_req_login',
        'all_btn_bg',
        'all_btn_txt',
        'quote_btn_bg',
        'quote_btn_txt',
    ];

    protected $hidden = [
        'created_at', 'updated_at',
    ];
}
