<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use DB;

class SmtpController extends Controller
{
    function saveConfiguration(Request $request){
        $requestData = $request->all();
        foreach ($requestData as $value) {
            if($value['host'] == ''){
                return response()->json(['message'=>'Smtp Host field is required','status'=>'fail']);
            }
            if($value['port'] == ''){
                return response()->json(['message'=>'Smtp Post field is required','status'=>'fail']);
            }
            if($value['username'] == ''){
                return response()->json(['message'=>'Smtp Username field is required','status'=>'fail']);
            }
            if($value['password'] == ''){
                return response()->json(['message'=>'Smtp Password field is required','status'=>'fail']);
            }
            // echo '<pre>';print_r($value);
            $domainExists = DB::table('smtp_config')->where(['shop_name'=> $value['shopDomain']])->first();
            if($domainExists){
                $updateData = [
                    'protocol'      => $value['encryption'],
                    'smtphost'      => $value['host'],
                    'smtpport'      => $value['port'],
                    'smtpusername'  => $value['username'],
                    'smtppassword'  => $value['password'],
                    'shop_name'     => $value['shopDomain'],
                    'created_at'    => date('Y-m-d h:i:s'),
                    'updated_at'    => date('Y-m-d h:i:s'),
                ];
                $saveSmtpData =  DB::table('smtp_config')->update($updateData);
            }else{
                $insertData = [
                    'protocol'      => $value['encryption'],
                    'smtphost'      => $value['host'],
                    'smtpport'      => $value['port'],
                    'smtpusername'  => $value['username'],
                    'smtppassword'  => $value['password'],
                    'shop_name'     => $value['shopDomain'],
                    'created_at'    => date('Y-m-d h:i:s'),
                    'updated_at'    => date('Y-m-d h:i:s'),
                ];
                $saveSmtpData =  DB::table('smtp_config')->insert($insertData);
            }
        }
        return response()->json(['message'=>'Smtp Configuration added successfully','status'=>'success']);
        // exit;
    }

    public static function getSmtpConfiguration($shopDomain)
    {
        $getSmtpData = DB::table('smtp_config')->where(['shop_name'=> $shopDomain])->first();
        if($getSmtpData){
            $getSmtpData->port = (string)$getSmtpData->smtpport;
            return $getSmtpData;
        }else{
            $getSmtpData = [
                'protocol'=>"",
                'smtphost'=>"",
                'smtpport'=>"",
                'smtpusername'=>"",
                'smtppassword'=>"",
                'shop_name'=>"",
            ];
            return $getSmtpData;
        }
    }


    public function setOneWebhook(){
        $api_key = "bd7a81b417f1c1b17eeb0a11ab3295db";
        $hostname = 'cassiocreations.myshopify.com';
        $apppassword = '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';
        $data['webhook'] = array(
            "topic"     => "app/uninstalled",
            'address'   => "https://kenanddana-dl.gfindex.com/webhook/app-uninstalled"
        );
        $data_string = json_encode($data);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
        $url = 'https://' . $api_key . ':' . $apppassword . '@' . $hostname . '/admin/api/2023-04/webhooks.json';
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
        $output = curl_exec($ch);
        $final_data = json_decode($output, true);
        echo '<pre>';print_r($hostname);
        echo '<pre>';print_r($final_data);
        exit;

        return $final_data;
    }
}
