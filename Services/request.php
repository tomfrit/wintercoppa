<?php
    include('../index.php');
    $cache = wire('modules')->get("MarkupCache");
    $sanitizer = wire('sanitizer');
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }

    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        #exit(0);
    }
#echo $_GET['f'];die();
// initialize curl ressource handle
    $request = $sanitizer->name($_GET['f']);
    if(!$data = $cache->get($request,360)) {
        $c = curl_init('https://winterpokal.rennrad-news.de/'.$_GET['f']);#api/v1/teams/get/407.json');

// set API token header
        curl_setopt(
            $c,
            CURLOPT_HTTPHEADER,
            array('api-token: N10AW3K7MQAMX4E230TUG9JXQEASWTG5IYKJ')
        );

// store the response body into a variable instead of directly printing it
        curl_setopt($c, CURLOPT_RETURNTRANSFER, true);

// execute the request
        $data = curl_exec($c);

        if (false === $data) {
            throw new RuntimeException('ERR_CURL_REQUEST_FAILED');
        }

#$parsed_result = json_decode($result);
    }

echo $data;
?>