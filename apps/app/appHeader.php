<!DOCTYPE html>
<html lang="es" xml:lang="es">
<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport"/>
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

  <!-- Disable automatic phone number detection. -->
  <meta name="format-detection" content="telephone=no">
  <!-- FAVICON -->
  <link rel="shortcut icon" href="<?php echo $app_server.$app_path; ?>img/favicon.png" type="image/png">
  <link rel="icon" href="<?php echo $app_server.$app_path; ?>img/favicon.png" type="image/png">
  <!-- STYLES -->
  <link rel="stylesheet" href="<?php echo $app_server.$app_path; ?>w3.css"> 
  <link rel="stylesheet" href="<?php echo $app_server.$app_path; ?>font-awesome.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato">
  <link rel="stylesheet" href="<?php echo $app_server.$app_path; ?>style.css">
  <style>
    body,h1,h2,h3,h4,h5,h6 {font-family: "Lato", sans-serif;}
    body, html {
      height: 100%;
      color: #777;
      line-height: 1.8;
    }

    .w3-wide {letter-spacing: 10px;}
    .w3-hover-opacity {cursor: pointer;}

  </style>
</head>
<body>

<!-- Header -->
<header class="w3-center w3-black w3-padding-64 w3-opacity w3-hover-opacity-off">
  <h1 class="w3-center"><b><?php echo $app_name; ?></b> <?php echo $app_version; ?></h1>
</header>