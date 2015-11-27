<?php 
	$teams = array(417,405,404,406,407,399,403);
	include('../index.php');
	$log = new FileLog($config->paths->logs . 'wintercoppa.txt'); 
	$input = wire('input');	
	$session = wire('session');
	$params = json_decode(file_get_contents('php://input'));
	$return = new stdClass;
	#print_r($params);die();
	if($params->f=='login' && $params->login && $params->password) {
		#echo "hello";die();
		$login = $params->login;
		$password = $params->password;
		$c = curl_init('https://winterpokal.rennrad-news.de/api/v1/tokens/get.json');#api/v1/teams/get/407.json');
		curl_setopt($c,CURLOPTS_POST,1);
		curl_setopt($c, CURLOPT_POSTFIELDS,
            "login=$login&password=$password");
		// store the response body into a variable instead of directly printing it
		curl_setopt($c, CURLOPT_RETURNTRANSFER, true);

		$result = curl_exec($c);

		if (false === $result) {
    		throw new RuntimeException('ERR_CURL_REQUEST_FAILED');
		}	
		$data = json_decode($result);
		if($data->status == 'OK') {
			$token = $data->data->tokens[0]->token;
			$session->token = $token;

		}
		else {
			$session->remove('token');
			$return = $data;
		}

	}
	if($params->f=='logout') {
		$session->remove('token');
	}
	if($session->token) {
		$c = curl_init('https://winterpokal.rennrad-news.de/api/v1/users/me.json');
		curl_setopt(
    		$c,
    		CURLOPT_HTTPHEADER,
    		array('api-token: '.$session->token)
		);

		// store the response body into a variable instead of directly printing it
		curl_setopt($c, CURLOPT_RETURNTRANSFER, true);

		// execute the request
		$result = curl_exec($c);

		if (false === $result) {
    		throw new RuntimeException('ERR_CURL_REQUEST_FAILED');
		}
		$data = json_decode($result);
		if(in_array($data->data->team->id,$teams)) {
			$return->loggedIn = true;
			$return->team = $data->data->team;
			$return->user = $data->data->user;
			$log->save($data->data->user->name." hat sich angemeldet"); 
		}
		else {
			$return->loggedIn = false;
			$session->remove('token');
			$log->save($data->data->user->name." hat versucht sich anzumelden"); 
			$return->messages = array("Du bist leider nicht Teil eines Scuderia Südstadt Teams");

		}
		echo json_encode($return);

	}
	else {
		$return->loggedIn=false;
		echo json_encode($return);
	}