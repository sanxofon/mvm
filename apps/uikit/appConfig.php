<?php

$app_name = "Template de ejemplo usando UIKit";    // El nombre de la App
$app_shortname = "uikit";                   // Nombre corto de la app
$app_author = "Santiago C. Novaro";            // Autor de la app
$app_authorTwitter = "@sanxofon";              // Usuario twitter del autor de la app 
$app_subject = "Matemáticas";  // Temas de la app (separados por coma) 
$app_version = "v3.15";                         // Versión actual de uikit
$app_year = "2022";                            // Año de publicación de la app
if(@$_GET['launcher']) $app_version = $app_version."b"; // No modificar esta línea
$app_description = "Este template muestra cómo hacer una PWA usando UIKit v3 (getuikit.com)"; // Descripción general de la app.
$app_server = "";                   // Servidor donde la app está alojada (DNS ó IP). Se puede usar cadena vacía "" para cualquiera.
$app_path = "/museomates/mvm/apps/".$app_shortname."/";  // Ruta absoluta a la app desde la raíz del servidor (debe empezar y terminar en "/")
