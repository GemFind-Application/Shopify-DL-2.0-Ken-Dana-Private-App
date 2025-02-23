<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->data = $data;
        // echo '<pre>';print_r($this->data);exit;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from("shopifyapps@shopifyappserver.gemfind.com")
                    ->view('common.installEmail')
                    ->subject('INSTALL-RINGBUILDER-DEV')
                    ->with('data',$this->data);
    }
}
