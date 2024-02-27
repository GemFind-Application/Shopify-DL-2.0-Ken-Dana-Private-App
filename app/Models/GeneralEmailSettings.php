<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class GeneralEmailSettings extends Model
{
    protected $table = 'email_settings';

    protected $fillable = [
        'shop',
        'admin_email',
        'subject',
        'smtp',
        'port',
        'mail_encryption',
        'username',
        'password',
        'from_email',
        'created_at',
        'updated_at',
    ];

    protected $hidden = [
    ];

    public function ConfiguredEmail($query) {

        $user = Auth::user();
    
        return $query->where('id', $user->id);
    
      }
}
