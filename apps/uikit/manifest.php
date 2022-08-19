<?php
include_once("appConfig.php");
header('Content-Type: application/manifest+json');

$manifest = [
  "dir" => "ltr",
  "lang" => "es-MX",
  "name" => $app_name." ".$app_version,
  "short_name" => $app_shortname,
  "display" => "fullscreen",
  "description" => $app_description,
  "background_color" => "#808080",
  "theme_color" => "#202020",
  "orientation" => "portrait",
  "categories" => ["education"],
  "icons" => [
    [
      "src" => $app_server.$app_path."img/launcher-icon-1x.png",
      "type" => "image/png",
      "sizes" => "48x48"
    ],
    [
      "src" => $app_server.$app_path."img/launcher-icon-2x.png",
      "type" => "image/png",
      "sizes" => "96x96"
    ],
    [
      "src" => $app_server.$app_path."img/launcher-icon-4x.png",
      "type" => "image/png",
      "sizes" => "192x192"
    ],
    [
      "src" => $app_server.$app_path."img/launcher-icon-512.png",
      "type" => "image/png",
      "sizes" => "512x512"
    ]
  ],
  "screenshots" => [
    [
      "src" => $app_server.$app_path."img/screenshot1.png",
      "sizes" => "1123x655",
      "type" => "image/png"
    ],
    [
      "src" => $app_server.$app_path."img/screenshot2.png",
      "sizes" => "1080x2340",
      "type" => "image/png"
    ]
  ],
  "scope" => $app_server.$app_path."",
  "start_url" => $app_server.$app_path."?launcher=true"
];

echo json_encode($manifest);
