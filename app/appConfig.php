<?php

$app_name = "Progressive Web App Template";    // El nombre de la App
$app_shortname = "PWAT2022";                   // Nombre corto de la app
$app_author = "Santiago C. Novaro";            // Autor de la app
$app_authorTwitter = "@sanxofon";              // Usuario twitter del autor de la app 
$app_version = "v0.5";                         // Versión actual
$app_year = "2022";                            // Año de publicación de la app
if(@$_GET['launcher']) $app_version = $app_version."b"; // No modificar esta línea
$app_description = "Máxima compatibilidad con los nuevos dispositivos inteligentes Android"; // Descripción general de la app.
$app_server = "//localhost";                   // Servidor donde la app está alojada (DNS ó IP)
$app_path = "/app/";                           // Ruta a la app desde la raíz del servidor (debe empezar y terminar en "/")
