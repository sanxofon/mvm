# Plantilla vacía para crear una Web App
**Versión 0**

## Se pueden editar los archivos:

### appConfig.php

Este archivo contiene los metadatos técnicamente indispensables para una Progressive Web App

    $appname = "Progressive Web App Template"; // El nombre de la App
    $shortname = "PWAT2019";                   // Nombre corto de la app
    $version = "v2019";                        // Versión actual
    if(@$_GET['launcher']) $version = $version."b"; // No modificar esta línea
    $description = "Máxima compatibilidad con los nuevos dispositivos inteligentes Android"; // Descripción del sitio
    $servidor = "//localhost"; // Servidor (DNS o IP)
    $ruta = "/app/"; // Ruta desde la raíz del servidor
    
### appHeader.php

Cabecera de la app. No necesita demasiadas modificaciones excepto que acá se deben incluír las librerías javascript y recursos css que se requieran en la app.

### appFooter.php

Footer general de la app. Puede incluir disclaimers legales, copyright, enlaces, contacto, redes, etc.

### index.php & appStart.php

Son ejemplos simples de páginas que implementan el template actual.

### manifest.php

Se trata de un archivo indispensable para el protocolo de PWA. El template se encarga de generar este archivo correctamente.

### sw.php

Este es el *service worker* de la app. Toda web app que se precie necesitará eventualmente un *service worker*. Esto permite, entre otras cosas navegar ráidamente usando caché, acceso offline, notificaciones push y más.

## Estilos y CSS

El presente template viene con varias imágenes de ejemplo que tienen las dimensiones adecuadas para mostrarse adecuadamente en los distintos dispositivos.
Los archivos de imagen en distintas dimensiones requeridos para este template están en la carpeta **[img/](img/)**.

### w3.css & font-awesome.min.css

El template usa por defecto una plantilla CSS muy simple pero útil creada por [W3Schools](https://www.w3schools.com/w3css/defaulT.asp) que permite dar formatos y estilos estándar a la app. 
Esta plantilla (no llega a ser una framework) utiliza una versión abierta de *FontAwesome* para darnos muchos íconos que podemos usar [como dice acá](https://www.w3schools.com/w3css/w3css_icons.asp).
Las fonts de estos íconos están en la carpeta **[fonts/](fonts/)**.

### app.css

Los estilos de la app se pueden poner en este archivo.
