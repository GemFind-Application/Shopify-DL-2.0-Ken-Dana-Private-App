<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TranslationSettings extends Model
{
    protected $table = 'translation_settings';

    protected $fillable = [
        'shop',
        'req_qyt_txt',
        'login_price_btn_txt',
        'success_add_qyt_msg',
        'cont_shop',
        'view_qyt',
        'prod_select',
        'contact_info',
        'review_info',
        'nxt_step',
        'prev_step',
        'contact_info_head',
        'contact_info_subhead',
        'back',
        'update_btn',
        'products',
        'follow_products',
        'thank_u',
        'toast',
        'empty_qyt_msg',
        'submit_qyt_btn_txt',
        'submitting_qyt_btn_txt',
        'cont_shop_btn_txt',
        'img',
        'product_req_page',
        'vendor',
        'sku',
        'option_btn',
        'quantty',
        'price',
	    'total',
	    'subtotal',
	    'req_page_remove',
	    'required',
	    'inv_name',
	    'inv_email',
	    'inv_phone',
	    'history_page_remove',
	    'user_not_login',
	    'empty_history_qyt_msg',
	    'acc_info',
	    'customer_name',
	    'quote_id',
	    'date',
	    'items',
	    'actions',
	    'quote_view',
        'created_at',
        'updated_at',
    ];

    protected $hidden = [
    ];
}
