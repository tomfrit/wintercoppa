<!DOCTYPE html>
<html ng-app="winterCoppa">
<head>

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="description" content="Wollt ihr die totale Statistik?" />
    <meta name="keywords" content="Scuderia Südstadt Wintercoppa Winterpokal Rennrad Cycling" />
    <meta name="language" content="de" /> 
    <meta name="image" content="//img/scudi.jpg">
    <link rel="shortcut icon" href="/favicon.ico" />
    <title>Die Scuderia Südstadt im Winterpokal</title>
    <base href="//<?=$_SERVER['SERVER_NAME'];?>/" />
    <meta property="og:title" content="Die Scuderia Südstadt im Winterpokal"/>
    <meta property="og:description" content="Wollt ihr die totale Statistik?"/>
    <meta property="og:url" content="//wintercoppa.enizehates.de/"/>
    <meta property="og:type" content="website"/>
    <meta property="og:image" content="//img/scudi.jpg"/>
    <meta property="og:site_name" content="Die Scuderia Südstadt im Winterpokal"/>
    <meta property="fb:admins" content="1410691276"/>
    <link rel="stylesheet" href="/vendor/uikit/css/uikit.almost-flat.min.css" />
    <link rel="stylesheet" href="/vendor/uikit/css/components/accordion.almost-flat.min.css" />
    <link rel="stylesheet" href="/vendor/uikit/css/components/progress.almost-flat.min.css" />
    <link rel="stylesheet" href="/site/templates/styles/style.css" />
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular-resource.min.js"></script>
    <script src="/vendor/angular-ui-router.min.js"></script>
    <script src="/vendor/ng-google-chart.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.js"></script>
    <script src="/vendor/uikit/js/uikit.min.js"></script>
    <script src="/vendor/uikit/js/components/accordion.min.js"></script>
    <script src="/client/app/config.js"></script>
    

</head>

<body>



 

    <div class="all">
        <div class="content-wrapper uk-grid uk-margin-large-top" style="margin-left:-15px">
            <div class="uk-width-1-1" ui-view autoscroll='true'>
                <div class="uk-container-center uk-width-3-4 uk-panel uk-panel-box uk-margin-top">
                <p class="uk-text-bold uk-text-large">Moin</p>
                <p id="status" class="uk-text-muted uk-text-small">Ich muss kurz noch was laden.</p>
                <div class="uk-progress uk-progress-striped uk-active">
                    <div id="progress" class="uk-progress-bar"></div>
                </div>
                </div>
            </div>
            
        </div>




    </div>

</body>
</html>

