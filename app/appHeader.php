<!DOCTYPE html>
<html lang="es" xml:lang="es">
<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport"/>
  <!-- <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0"/> -->
  <!-- Search Engine -->
  <meta name="description" content="<?php echo $description; ?>">
  <meta name="image" content="<?php echo $servidor.$ruta; ?>img/<?php echo $shortname; ?>_705x368.png">
  <meta name="author" content="Santiago Chávez">
  <link rel="manifest" href="<?php echo $servidor.$ruta; ?>manifest.php">
  <title><?php echo $appname; ?> <?php echo $version; ?></title>
  <meta name="theme-color" content="#202020" />
  <!-- Allow web app to be run in full-screen mode. -->
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="application-name" content="<?php echo $appname; ?>">
  <meta name="apple-mobile-web-app-title" content="<?php echo $appname; ?>">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <link rel="apple-touch-icon" href="<?php echo $servidor.$ruta; ?>img/launcher-icon-4x.png">
  <!-- Open Graph general (Facebook, Pinterest & Google+) -->
  <meta name="og:title" content="<?php echo $appname; ?> <?php echo $version; ?>">
  <meta name="og:description" content="<?php echo $description; ?>">
  <meta name="og:image" content="<?php echo $servidor.$ruta; ?>img/<?php echo $shortname; ?>.png">
  <meta name="og:url" content="<?php echo $servidor.$ruta; ?>">
  <meta name="og:site_name" content="<?php echo $appname; ?>">
  <meta name="og:locale" content="es_MX">
  <meta name="og:type" content="website">
  <meta name="website:author" content="Santiago Chávez">
  <!-- Schema.org for Google -->
  <meta itemprop="name" content="<?php echo $appname; ?>">
  <meta itemprop="description" content="<?php echo $description; ?>">
  <meta itemprop="image" content="<?php echo $servidor.$ruta; ?>img/<?php echo $shortname; ?>.png">
  <!-- Twitter -->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="<?php echo $appname; ?>">
  <meta name="twitter:description" content="<?php echo $description; ?>">
  <meta name="twitter:site" content="@sanxofon">
  <meta name="twitter:creator" content="@sanxofon">
  <meta name="twitter:image:src" content="<?php echo $servidor.$ruta; ?>img/<?php echo $shortname; ?>.png">

  <!-- Disable automatic phone number detection. -->
  <meta name="format-detection" content="telephone=no">
  <!-- FAVICON -->
  <link rel="shortcut icon" href="<?php echo $servidor.$ruta; ?>img/favicon.png" type="image/png">
  <link rel="icon" href="<?php echo $servidor.$ruta; ?>img/favicon.png" type="image/png">
  <!-- STYLES -->
  <link rel="stylesheet" href="<?php echo $servidor.$ruta; ?>w3.css"> 
  <link rel="stylesheet" href="<?php echo $servidor.$ruta; ?>font-awesome.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato">
  <link rel="stylesheet" href="<?php echo $servidor.$ruta; ?><?php echo $shortname; ?>.css">