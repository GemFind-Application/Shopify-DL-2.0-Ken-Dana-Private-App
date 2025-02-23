<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::post('/getMyBooking', 'SessionController@getMyBooking');
Route::namespace('App\\Http\\Controllers')->group(function () {

    //CUSTOMER API
    Route::get('ifCustomerExists/{shopDomain}', 'SettingsController@ifCustomerExists');
    Route::post('saveCustomer', 'SettingsController@saveCustomer');

    //SETTINGS API
    Route::post('saveSettings', 'SettingsController@saveSettings');
    Route::get('getSettingsData/{shopDomain}', 'SettingsController@getSettingsData');

    //PLANS API
    Route::post('basicPlanApi/{shopDomain}', 'PlanController@basicPlanApi');
    Route::post('tryonPlanApi/{shopDomain}', 'PlanController@tryonPlanApi');
    Route::get('ifPlanIdExists/{shopDomain}', 'PlanController@ifPlanIdExists');

    //COUPON API
    Route::get('getCouponDetails/{shopDomain}/{couponCode}', 'CouponController@getCouponDetails');

    //INIT TOOL API
    Route::post('initToolApi', 'InitToolController@initToolApi');

    //RING EMAIL API
    Route::post('dropHintApi', 'RingEmailController@dropHintApi');
    Route::post('reqInfoApi', 'RingEmailController@reqInfoApi');
    Route::post('emailFriendApi', 'RingEmailController@emailFriendApi');
    Route::post('scheViewApi', 'RingEmailController@scheViewApi');

    //DIAMOND EMAIL API
    Route::post('dlDropHintApi', 'DiamondEmailController@dlDropHintApi');
    Route::post('dlReqInfoApi', 'DiamondEmailController@dlReqInfoApi');
    Route::post('dlEmailFriendApi', 'DiamondEmailController@dlEmailFriendApi');
    Route::post('dlScheViewApi', 'DiamondEmailController@dlScheViewApi');
    Route::get('getDiamondDetailsApi/{diamond_id}/{type}/{shop}/{show_retailer_info}', 'DiamondEmailController@getDiamondDetailsApi');


    //COMPLETE RING EMAIL API
    Route::post('crReqInfoApi', 'CompleteRingEmailController@crReqInfoApi');
    Route::post('crScheViewApi', 'CompleteRingEmailController@crScheViewApi');

    //ADD TO CART
    Route::post('addToCart', 'AddToCartController@addToCart');

    //ADD TO PDF DOWNLOAD
    Route::get('printDiamond/{shop}/{diamond_id}/{type}', 'AddToCartController@printDiamond');

    //GET PRODUCT DETAILS API
    Route::get('getProductDetails/{shop}/{product_id}/{variant_id}', 'AddToCartController@getProductDetails');

    //GET METAFIELDS API
    Route::post('getMetafields/{shop}/{product_id}', 'SettingsController@getMetafields');

    //GET CURRENT VERSION API
    Route::get('getCurrentVersion', 'SettingsController@getCurrentVersion');

    //SAVE CSS CONFIGURATION DATA
    Route::post('saveCSSConfiguration', 'SettingsController@saveCSSConfiguration');
    Route::get('getCSSConfiguration/{shop}', 'SettingsController@getCSSConfiguration');

    //UNINSTALL APP JOB
    Route::post('appUninstallJob', 'InitToolController@appUninstallJob');
    Route::post('appShopUpdateJob', 'InitToolController@appShopUpdateJob');
    Route::post('getWebhook', 'TestController@getWebhook');
    // Route::post('setWebhook', 'TestController@setWebhook');
    Route::post('setShopUpdateWebhook', 'TestController@setShopUpdateWebhook');
    Route::post('setUninstallWebhook', 'TestController@setUninstallWebhook');
    Route::post('updateUninstallWebhook', 'TestController@updateUninstallWebhook');

    //WEBHOOK API
    Route::post('/requestEndpoint', 'CustomerEndpointController@requestEndpoint');
    Route::post('/erasureEndpoint', 'CustomerEndpointController@erasureEndpoint');
    Route::post('/shopErasureEndpoint', 'CustomerEndpointController@shopErasureEndpoint');
});
