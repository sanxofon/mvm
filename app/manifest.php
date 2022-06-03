<?php
include_once("appConfig.php");
header('Content-Type: application/manifest+json');

// $servidor = "https://nucleocero.com";
$manifest = [
  "dir" => "ltr",
  "lang" => "es-MX",
  "name" => $appname." ".$version,
  "short_name" => $shortname,
  "display" => "fullscreen",
  "description" => $description,
  "background_color" => "#808080",
  "theme_color" => "#202020",
  "orientation" => "portrait",
  "categories" => ["education"],
  "icons" => [
    [
      "src" => $servidor.$ruta."img/launcher-icon-1x.png",
      "type" => "image/png",
      "sizes" => "48x48"
    ],
    [
      "src" => $servidor.$ruta."img/launcher-icon-2x.png",
      "type" => "image/png",
      "sizes" => "96x96"
    ],
    [
      "src" => $servidor.$ruta."img/launcher-icon-4x.png",
      "type" => "image/png",
      "sizes" => "192x192"
    ],
    [
      "src" => $servidor.$ruta."img/launcher-icon-512.png",
      "type" => "image/png",
      "sizes" => "512x512"
    ]
  ],
  "screenshots" => [
    [
      "src" => $servidor.$ruta."img/screenshot1.png",
      "sizes" => "1123x655",
      "type" => "image/png"
    ],
    [
      "src" => $servidor.$ruta."img/screenshot2.png",
      "sizes" => "1080x2340",
      "type" => "image/png"
    ]
  ],
  "scope" => $servidor.$ruta."",
  "start_url" => $servidor.$ruta."?launcher=true"
];

echo json_encode($manifest);
