<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GeneralSettings extends Model
{
    protected $table = 'general_settings';

    protected $fillable = [
        'shop',
        'btn_prod_list',
        'hide_add_cart',
        'hide_buy_btn',
        'prod_details',
        'msg_type',
        'require_login',
        'require_btn_bg',
        'require_btn_txt',
    ];

    protected $hidden = [
        'created_at', 'updated_at',
    ];
}
