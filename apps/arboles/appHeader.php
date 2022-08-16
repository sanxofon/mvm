<!DOCTYPE html>
<html lang="es" xml:lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
  <!-- <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0"/> -->
  <!-- Search Engine -->
  <meta name="description" content="<?php echo $app_description; ?>">
  <meta name="image" content="<?php echo $app_server.$app_path; ?>img/app_705x368.png">
  <meta name="author" content="<?php echo $app_author; ?>">
  <link rel="manifest" href="<?php echo $app_server.$app_path; ?>manifest.php">
  <title><?php echo $app_name; ?> <?php echo $app_version; ?></title>
  <meta name="theme-color" content="#202020" />
  <!-- Allow web app to be run in full-screen mode. -->
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="application-name" content="<?php echo $app_name; ?>">
  <meta name="apple-mobile-web-app-title" content="<?php echo $app_name; ?>">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <link rel="apple-touch-icon" href="<?php echo $app_server.$app_path; ?>img/launcher-icon-4x.png">
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
  <meta itemprop="image" content="<?php echo $app_server.$app_path; ?>img/app.jpg">
  <!-- Twitter -->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="<?php echo $app_name; ?>">
  <meta name="twitter:description" content="<?php echo $app_description; ?>">
  <meta name="twitter:site" content="<?php echo $app_authorTwitter; ?>">
  <meta name="twitter:creator" content="<?php echo $app_authorTwitter; ?>">
  <meta name="twitter:image:src" content="<?php echo $app_server.$app_path; ?>img/app.jpg">

  <!-- General Metadata y Robots -->
  <meta name="abstract" content="<?php echo $app_description; ?>" />
  <!-- <meta name="city" content="" /> -->
  <meta name="country" content="Mexico" />
  <!-- <meta name="ICBM" content="" />
  <meta name="classification" content="" />
  <meta name="pagerank" content="10" /> -->
  <meta name="author" content="<?php echo $app_author; ?>" />
  <meta name="Robots" content="NOODP" />
  <meta name="robots" content="index, follow" />
  <meta name="alexa" content="100" />
  <meta name="subject" content="<?php echo $app_subject; ?>" />
  <meta name="robots" content="all, index, follow" />
  <meta name="googlebot" content="all, index, follow" />
  
  <!-- Dublin Core -->
  <link rel="schema.DC" href="http://purl.org/dc/elements/1.1/" />
  <link rel="schema.DCTERMS" href="http://purl.org/dc/terms/" />
  <meta name="DC.title" content="<?php echo $app_name; ?>" />
  <meta name="DC.creator" content="<?php echo $app_author; ?>" />
  <meta name="DC.subject" content="<?php echo $app_subject; ?>" />
  <meta name="DC.description" content="<?php echo $app_description; ?>" />
  <meta name="DC.type" scheme="DCTERMS.DCMIType" content="InteractiveResource" />
  <meta name="DC.format" content="text/html" />
  <!-- <meta name="DC.identifier" scheme="DCTERMS.URI" content="" /> -->

  <!-- Deshabilita la deteccion de números telefónicos -->
  <meta name="format-detection" content="telephone=no">
  <!-- FAVICON -->
  <link rel="shortcut icon" href="<?php echo $app_server.$app_path; ?>img/favicon.png" type="image/png">
  <link rel="icon" href="<?php echo $app_server.$app_path; ?>img/favicon.png" type="image/png">
  <!-- STYLES -->
  <link rel="stylesheet" href="<?php echo $app_server.$app_path; ?>w3.css"> 
  <link rel="stylesheet" href="<?php echo $app_server.$app_path; ?>font-awesome.min.css">
  <link href="https://fonts.googleapis.com/css?family=Lato|Cabin|Nanum+Gothic+Coding|Pacifico" rel="stylesheet"> 
  <link rel="stylesheet" href="<?php echo $app_server.$app_path; ?>fonts.css">
  <link rel="stylesheet" href="<?php echo $app_server.$app_path; ?>style.css">
<style>
body {font-family: "Lato", sans-serif}
.mySlides {display: none}
</style>
  <!-- Header scripts -->
  <script src="<?php echo $app_server.$app_path; ?>d3.v5.min.js"></script>

</head>
<body>



<!-- Navbar -->
<div class="w3-top">
  <div class="w3-bar w3-black w3-card">
    <a class="w3-bar-item w3-button w3-padding-large w3-hide-medium w3-hide-large w3-right" href="javascript:void(0)" onclick="myNav()" title="Toggle Navigation Menu"><i class="fa fa-bars"></i></a>
    <a href="#" class="w3-bar-item w3-button w3-padding-large hpacifico"><?php echo $app_name; ?></a>
    <a href="#tour" class="w3-bar-item w3-button w3-padding-large w3-hide-small">TOUR</a>
    <a href="#work" class="w3-bar-item w3-button w3-padding-large w3-hide-small">WORK</a>
    <div class="w3-dropdown-hover w3-hide-small">
      <button class="w3-padding-large w3-button" title="More">MÁS <i class="fa fa-caret-down"></i></button>     
      <div class="w3-dropdown-content w3-bar-block w3-card-4">
        <a href="#" class="w3-bar-item w3-button">Extras</a>
        <a href="#" class="w3-bar-item w3-button" onclick="document.getElementById('ticketModal').style.display='block'">Tickets</a>
      </div>
    </div>
  </div>
</div>

<!-- Navbar on small screens (remove the onclick attribute if you want the navbar to always show on top of the content when clicking on the links) -->
<div id="navDemo" class="w3-bar-block w3-black w3-hide w3-hide-large w3-hide-medium w3-top" style="margin-top:46px">
  <a href="#tour" class="w3-bar-item w3-button w3-padding-large" onclick="myNav()">TOUR</a>comofuncionaCómo&nbsp;funciona
  <a href="#comofunciona" class="w3-bar-item w3-button w3-padding-large" onclick="myNav()">Cómo&nbsp;funciona</a>
  <a href="#" class="w3-bar-item w3-button w3-padding-large" onclick="myNav()">MERCH</a>
</div>