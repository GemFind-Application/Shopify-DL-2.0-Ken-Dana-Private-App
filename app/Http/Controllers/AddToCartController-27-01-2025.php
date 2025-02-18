<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use DB;
use Log;
use PDF;

class AddToCartController extends Controller
{
    public function addToCart(Request $request)
    {
        header('Access-Control-Allow-Origin: *');

        $shop_data = User::where('name', $request->shop_domain)->firstOrFail();

        // Get the HTTP referer
        $referer = $_SERVER['HTTP_REFERER'] ?? '';

        // Parse the URL to extract only the scheme and host
        $parsedUrl = parse_url($referer);
        $shop_base_url = $parsedUrl['scheme'] . '://' . $parsedUrl['host'];

        $diamond_product_id = "";

        if ($request->diamond_id) {
            try {
                $diamondData = $this->getDiamondById($request->dealer_id, $request->diamond_id, $request->is_lab);

                $certificateNo = $diamondData['diamondData']['certificateNo'] ? 'Certificate No.' . " - " . $diamondData['diamondData']['certificateNo'] : '';

                if ($certificateNo) {
                    $option_name =  $certificateNo . " | " . "Title : " . $diamondData['diamondData']['mainHeader'] . " | Shape : " . $diamondData['diamondData']['shape'] . " | CaratWeight : " . $diamondData['diamondData']['caratWeight'] . " | Cut : " . $diamondData['diamondData']['cut'] . " | Color : " . $diamondData['diamondData']['color'] . " | Clarity : " . $diamondData['diamondData']['clarity'];
                } else {
                    $option_name =  "Title : " . $diamondData['diamondData']['mainHeader'] . " | Shape : " . $diamondData['diamondData']['shape'] . " | CaratWeight : " . $diamondData['diamondData']['caratWeight'] . " | Cut : " . $diamondData['diamondData']['cut'] . " | Color : " . $diamondData['diamondData']['color'] . " | Clarity : " . $diamondData['diamondData']['clarity'];
                }
                // Query Shopify for existing product variant
                $graphqlQuery = <<<QUERY
                query GetProductVariants(\$query: String!) {
                    productVariants(first: 250, query: \$query) {
                        edges {
                            node {
                                product {
                                    id
                                }
                                inventoryItem {
                                    id
                                }
                                id
                                sku
                            }
                        }
                    }
                }
                QUERY;

                $variables = [
                    'query' => $request->diamond_id,
                ];

                $response = $this->executeGraphQL($request->shop_domain, $shop_data->password, $graphqlQuery, $variables);

                $sku = $response;
                $in_shopify = !empty($sku['data']['productVariants']['edges']) ? "1" : "0";

                if ($in_shopify == "1") {
                    $finalSku = $sku['data']['productVariants']['edges'][0]['node'];
                    $variantId = $finalSku['id'];
                    $productId = $finalSku['product']['id'];

                    $mutation = <<<QUERY
                        mutation UpdateProductVariantWithOptions(\$productId: ID!, \$variants: [ProductVariantsBulkInput!]!) {
                            productVariantsBulkUpdate(productId: \$productId, variants: \$variants) {
                                productVariants {
                                    id
                                    price
                                }
                                userErrors {
                                    field
                                    message
                                }
                            }
                        }
                        QUERY;

                    $variables = [
                        'productId' => $productId,
                        'variants' => [
                            [
                                'id' => $variantId,
                                'price' => (float)$diamondData['diamondData']['fltPrice'],
                            ]
                        ]
                    ];

                    $updateResponse = $this->executeGraphQL($request->shop_domain, $shop_data->password, $mutation, $variables);

                    if (isset($updateResponse['data']['productVariantsBulkUpdate']['productVariants'][0]['id'])) {
                        $diamond_product_id = preg_replace('/gid:\/\/shopify\/ProductVariant\//', '', $updateResponse['data']['productVariantsBulkUpdate']['productVariants'][0]['id']);
                    }
                } else {

                    $image_url = $diamondData['diamondData']['image2'] ?? '';

                    $mutation = <<<QUERY
                        mutation CreateProductWithVariants(\$input: ProductSetInput!) {
                            productSet(synchronous: true, input: \$input) {
                                product {
                                    id
                                    title
                                    media(first: 5) {
                                        nodes {
                                            id
                                            alt
                                            mediaContentType
                                            status
                                        }
                                    }
                                    variants(first: 10) {
                                        edges {
                                            node {
                                                id
                                                sku
                                                price
                                                media(first: 5) {
                                                    nodes {
                                                        id                                                       
                                                        alt
                                                        mediaContentType
                                                        status
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                userErrors {
                                    field
                                    message
                                }
                            }
                        }
                        QUERY;

                    $variables = [
                        'input' => [
                            'title' => $diamondData['diamondData']['mainHeader'],
                            'descriptionHtml' => $diamondData['diamondData']['subHeader'],
                            'vendor' => 'GemFind',
                            'productType' => 'GemFindDiamond',
                            'tags' => ['SEARCHANISE_IGNORE', 'GemfindDiamond'],
                            'productOptions' => [
                                [
                                    'name' => 'Properties',
                                    'position' => 1,
                                    'values' => [
                                        ['name' => $option_name],
                                    ],
                                ],
                            ],
                            'files' => [
                                [
                                    'originalSource' => $image_url, // URL to the product image
                                    'alt' => 'Product Image', // Optional alt text
                                    'contentType' => 'IMAGE', // Ensure this matches the file type
                                ],
                            ],
                            'variants' => [
                                [
                                    'optionValues' => [
                                        ['optionName' => 'Properties', 'name' => $option_name],
                                    ],
                                    'sku' => $request->diamond_id,
                                    'price' => (float)$diamondData['diamondData']['fltPrice'],
                                    'file' => [
                                        'originalSource' => $image_url, // URL to the variant image
                                        'alt' => 'Variant Image',
                                        'contentType' => 'IMAGE', // Match the file type
                                    ],
                                ],
                            ],
                        ],
                    ];

                    $createResponse = $this->executeGraphQL($request->shop_domain, $shop_data->password, $mutation, $variables);

                    if (!empty($createResponse['data']['productSet']['userErrors'])) {
                        foreach ($createResponse['data']['productSet']['userErrors'] as $error) {
                            echo "Error: " . $error['message'] . " (Field: " . implode(', ', $error['field']) . ")";
                        }
                        exit;
                    }

                    if (isset($createResponse['data']['productSet']['product']['id'])) {
                        $productId = $createResponse['data']['productSet']['product']['id'];

                        $diamond_product_id = preg_replace('/gid:\/\/shopify\/ProductVariant\//', '', $createResponse['data']['productSet']['product']['variants']['edges'][0]['node']['id']);

                        $fetchPublicationsQuery = <<<QUERY
                        query GetPublications {
                            publications(first: 10) {
                              nodes {
                                id
                                name
                              }
                            }
                        }
                        QUERY;

                        // Execute the query to fetch publications
                        $publicationsResponse = $this->executeGraphQL($request->shop_domain, $shop_data->password, $fetchPublicationsQuery);

                        if (isset($publicationsResponse['data']['publications']['nodes'])) {
                            $publications = $publicationsResponse['data']['publications']['nodes'];

                            // Find the publication ID for the "online_store" channel
                            $publicationId = null;
                            foreach ($publications as $publication) {

                                if ($publication['name'] == 'Online Store') {
                                    $publicationId = $publication['id'];
                                    break;
                                }
                            }

                            if ($publicationId) {

                                $publishMutation = <<<QUERY
                                    mutation CreateProductWithOnlineStore {
                                        publishablePublish(
                                            input: {publicationId: "$publicationId"}
                                            id: "$productId"
                                        ) {
                                            userErrors {
                                                message
                                                field
                                            }
                                        }
                                    }
                                    QUERY;

                                $publishResponse = $this->executeGraphQL($request->shop_domain, $shop_data->password, $publishMutation);
                            } else {
                                return response()->json(['status' => false, 'message' => 'Online Store publication not found.']);
                            }
                        } else {
                            return response()->json(['status' => false, 'message' => 'Error fetching publications.', 'errors' => $publicationsResponse]);
                        }
                    } else {
                        $userErrors = $createResponse['data']['productCreate']['userErrors'] ?? [];
                        return response()->json(['status' => false, 'message' => 'Error creating product', 'errors' => $userErrors]);
                    }
                }
            } catch (Exception $e) {
                return response()->json(['status' => false, 'message' => $e->getMessage()]);
            }
        }

        // Redirect or return the checkout URL
        if ($diamond_product_id) {
            // $checkout_url = $shop_base_url . "/cart/add?id[]=" . $diamond_product_id;

            $checkout_url = $shop_base_url
                . "/cart/add?id[]="
                . $diamond_product_id
                . (isset($diamondData['diamondData']['stockNumber']) ? "&properties[_stokeNumber]=" . $diamondData['diamondData']['stockNumber'] : "")
                . (isset($diamondData['diamondData']['measurement']) ? "&properties[_measurement]=" . $diamondData['diamondData']['measurement'] : "")
                . (isset($diamondData['diamondData']['vendorStockNo']) ? "&properties[_vendorStockNo]=" . $diamondData['diamondData']['vendorStockNo'] : "");


            $response = [
                'status' => true,
                'message' => "diamond",
                'data'    => $checkout_url,
            ];
            echo json_encode($checkout_url);
            exit;
        }

        return response()->json(['status' => false, 'message' => "Diamond not available."]);
    }

    private function executeGraphQL($shop_domain, $access_token, $query, $variables = [])
    {
        $url = "https://{$shop_domain}/admin/api/2025-01/graphql.json";

        $headers = [
            "Content-Type: application/json",
            "X-Shopify-Access-Token: {$access_token}",
        ];

        // Prepare payload
        $payload = json_encode([
            'query' => $query,
            'variables' => (object)$variables,
        ]);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $response = curl_exec($ch);

        if (curl_errno($ch)) {
            throw new Exception('cURL error: ' . curl_error($ch));
        }

        curl_close($ch);

        return json_decode($response, true);
    }

    public static function getDiamondById($dealerId, $diamondId, $isalab)
    {
        if ($isalab == "true") {
            $requestUrl = "http://api.jewelcloud.com/api/RingBuilder/GetDiamondDetail?DealerID=" . $dealerId . "&DID=" . $diamondId . '&IsLabGrown=true';
        } else {
            $requestUrl = "http://api.jewelcloud.com/api/RingBuilder/GetDiamondDetail?DealerID=" . $dealerId . "&DID=" . $diamondId;
        }
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $requestUrl);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HEADER, false);
        $response = curl_exec($curl);
        $results = json_decode($response);
        if (curl_errno($curl)) {
            return $returnData = ['diamondData' => [], 'total' => 0, 'message' => 'Gemfind: An error has occurred.'];
        }
        if (isset($results->message)) {
            return $returnData = ['diamondData' => [], 'total' => 0, 'message' => 'Gemfind: An error has occurred.'];
        }
        curl_close($curl);
        if ($results->diamondId != "" && $results->diamondId > 0) {
            $diamondData = (array) $results;
            $returnData = ['diamondData' => $diamondData];
        } else {
            $returnData = ['diamondData' => []];
        }
        return $returnData;
    }



    //    function printDiamond($shop_domain,$diamond_id,$type) {
    //        //header('Access-Control-Allow-Origin', "*");
    //        header('Access-Control-Allow-Origin: *');
    //        $getDiamondData = self::getDiamondByIdForPdf($shop_domain,$diamond_id,$type);
    //        view()->share('diamond',$getDiamondData);
    //        $pdf = PDF::loadView('printDiamond', $getDiamondData);
    //        $headers = array(
    //          'Content-Type: application/pdf',
    //        );
    //        return $pdf->download('Diamond.pdf',$headers);
    // }

    function printDiamond($shop_domain, $diamond_id, $type)
    {
        // header('Access-Control-Allow-Origin: *');
        // header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
        $getDiamondData = self::getDiamondByIdForPdf($shop_domain, $diamond_id, $type);
        // echo "<pre>";
        // print_r($type);
        // exit();
        view()->share('diamond', $getDiamondData);
        $pdf = PDF::loadView('printDiamond', $getDiamondData);
        $headers = array(
            'Content-Type: application/pdf',
        );
        return $pdf->download('Diamond-' . $diamond_id . '.pdf', $headers);
    }


    public static function getDiamondByIdForPdf($shop, $diamondId, $type)
    {
        // $IslabGrown = '';
        // if ($type && $type == 'labcreated') {
        //     $diamond_type = '&IslabGrown=true';
        // } elseif ($type == 'fancydiamonds') {
        //     $diamond_type = '&IsFancy=true';
        // } else {
        //     $diamond_type = '';
        // }



        $shop_data = DB::table('diamondlink_config')->where('shop', $shop)->first();

        if ($type == "true") {
            $requestUrl = "http://api.jewelcloud.com/api/RingBuilder/GetDiamondDetail?DealerID=" . $shop_data->dealerid . "&DID=" . $diamondId . '&IsLabGrown=true';
        } else {
            $requestUrl = "http://api.jewelcloud.com/api/RingBuilder/GetDiamondDetail?DealerID=" . $shop_data->dealerid . "&DID=" . $diamondId;
        }

        //$requestUrl = "http://api.jewelcloud.com/api/RingBuilder/GetDiamondDetail?DealerID=" . $shop_data->dealerid . "&DID=" . $diamondId;
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $requestUrl);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HEADER, false);
        $response = curl_exec($curl);
        $results = json_decode($response);
        if (curl_errno($curl)) {
            return $returnData = ['diamondData' => [], 'total' => 0, 'message' => 'Gemfind: An error has occurred.'];
        }
        if (isset($results->message)) {
            return $returnData = ['diamondData' => [], 'total' => 0, 'message' => 'Gemfind: An error has occurred.'];
        }
        curl_close($curl);
        if ($results->diamondId != "" && $results->diamondId > 0) {
            $diamondData = (array) $results;
            $returnData = ['diamondData' => $diamondData];
        } else {
            $returnData = ['diamondData' => []];
        }
        return $returnData;
    }
}
