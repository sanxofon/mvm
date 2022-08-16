<!DOCTYPE html>
<html lang="es" xml:lang="es">

<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport"/> -->
  <!-- <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0"/> -->

   <!-- Search Engine -->
  <meta name="description" content="<?php echo $app_description; ?>">
  <meta name="image" content="img/app_705x368.png">
  <meta name="author" content="<?php echo $app_author; ?>">
  <link rel="manifest" href="manifest.php">
  <title><?php echo $app_name; ?> <?php echo $app_version; ?></title>
  <meta name="theme-color" content="#202020" />
  <!-- Allow web app to be run in full-screen mode. -->
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="application-name" content="<?php echo $app_name; ?>">
  <meta name="apple-mobile-web-app-title" content="<?php echo $app_name; ?>">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <link rel="apple-touch-icon" href="img/launcher-icon-4x.png">
  <!-- Open Graph general (Facebook, Pinterest & Google+) -->
  <meta name="og:title" content="<?php echo $app_name; ?> <?php echo $app_version; ?>">
  <meta name="og:description" content="<?php echo $app_description; ?>">
  <meta name="og:image" content="<?php echo $app_server.$app_path; ?>img/app.jpg">
  <meta name="og:url" content="<?php echo $app_server.$app_path; ?>">
  <meta name="og:site_name" content="<?php echo $app_name; ?>">
  <meta name="og:locale" content="es_MX">
  <meta name="og:type" content="app">
  <meta name="website:author" content="<?php echo $app_author; ?>">
  <!-- Schema.org for Google -->
  <meta itemprop="name" content="<?php echo $app_name; ?>">
  <meta itemprop="description" content="<?php echo $app_description; ?>">
  <meta itemprop="image" content="img/app.jpg">
  <!-- Twitter -->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="<?php echo $app_name; ?>">
  <meta name="twitter:description" content="<?php echo $app_description; ?>">
  <meta name="twitter:site" content="<?php echo $app_authorTwitter; ?>">
  <meta name="twitter:creator" content="<?php echo $app_authorTwitter; ?>">
  <meta name="twitter:image:src" content="img/app.jpg">

  <!-- Disable automatic phone number detection. -->
  <meta name="format-detection" content="telephone=no">
  <!-- FAVICON -->
  <link rel="shortcut icon" href="img/favicon.png" type="image/png">
  <link rel="icon" href="img/favicon.png" type="image/png">
  <!-- STYLES -->
  <!-- <link rel="stylesheet" href="w3.css"> 
  <link rel="stylesheet" href="font-awesome.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato">
  -->
 
  <!-- JQueryMobile -->
  <link rel="stylesheet" href="jquery/7temas.min.css" />
  <link rel="stylesheet" href="jquery/jquery.mobile.icons.min.css" />
	<link rel="stylesheet" href="jquery/jquery.mobile-1.4.5.min.css">
	<link rel="stylesheet" href="jquery/jqm-demos.css">
	<script src="jquery/jquery-2.2.4.min.js"></script>
	<script src="jquery/index.js"></script>
	<script src="jquery/jquery.mobile-1.4.5.min.js"></script>
	<script id="panel-init">
		$(function() {
			$( "body>[data-role='panel']" ).panel();
			$( "[data-role='navbar']" ).navbar();
			$( "[data-role='header'], [data-role='footer']" ).toolbar();
		});
	</script>

  <!-- Swiper JS & CSS -->
  <link rel="stylesheet" href="swiper/swiper-bundle.min.css"/>
  <script src="swiper/swiper-bundle.min.js"></script>

  <!-- ZDog Animation -->
  <script src="zdog.dist.js"></script>

  <!-- Custom CSS -->
  <link rel="stylesheet" href="style.css">
</head>
<body>

<!-- /header1 -->
<div id="cabeza" data-role="header" data-theme="a">
  <h1>Cabecera</h1>
  <a href="#leftpanel" data-icon="eye" data-iconpos="notext">Museo</a>
  <a href="#rightpanel" data-icon="gear" data-iconpos="notext">Ficha</a>

</div>
