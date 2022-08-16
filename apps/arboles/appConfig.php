<?php

$app_name = "Árboles";                         // El nombre de la App
$app_shortname = "arboles";                    // Nombre corto de la app (solo letras y números, minúsculas, sin acentos, sin espacios)
$app_author = "Santiago C. Novaro";            // Autor de la app
$app_authorTwitter = "@sanxofon";              // Usuario twitter del autor de la app
$app_subject = "Matemáticas, Grafos, Árboles";  // Temas de la app (separados por coma) 
$app_version = "v0.2";                         // Versión actual
$app_year = "2022";                            // Año de publicación de la app
if(@$_GET['launcher']) $app_version = $app_version."b"; // No modificar esta línea, sirve para detectar si el usuario ha cargado la página como una app instalada o como una página web.
$app_description = "Este script crea árboles de 1>n<100 vértices al azar y los despliega. No existe una fórmula conocida para calcular el número de variedades que un árbol puede tener con n vértices. Se conoce ese número sólo hasta n=36."; // Descripción general de la app.
$app_server = "";                   // Servidor donde la app está alojada (DNS ó IP). Se puede usar cadena vacía "" para cualquiera.
$app_path = "/museomates/mvm/apps/".$app_shortname."/";  // Ruta absoluta a la app desde la raíz del servidor (debe empezar y terminar en "/")
