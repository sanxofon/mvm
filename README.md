# Museo Virtual de Matemáticas

[![General badge](https://img.shields.io/badge/VER_EN-GITHUB_PAGES-<COLOR>.svg)](https://sanxofon.github.io/mvm/)

Este museo pretende albergar distintas web-apps dispuestas en distintas salas, con curaduría, interactividad y la posibilidad de profundizar más con artículos en "blocks de notas" interactivos y editables. Las salas del museo serán temáticas, por orientación etérea, etc. y contendrán 5 apps cada una. El formato de las salas será de navegación 360° en base a fondos equirectangulares dibujados a mano sobre guías de estructuras creadas como objetos 3D en ordenador.

## Plantillas para crear Progressive Web Apps (PWA)

| **Nombre**   | **CSS**   | **JS** | **Descripcion**                                                    | **Tipo** |
|--------------|-----------|--------|--------------------------------------------------------------------|----------|
| [App Vacía](https://lengua.la/mvm/apps/app)    | w3.css    | Core   | Incluye localstorage, worker, íconos, json, etc.                   | Template |
| [JQM](https://lengua.la/mvm/apps/jqm)      | JQ Mobile | JQuery | Incluye demostración de la librería swiper                         | Demo     |
| [Árboles](https://lengua.la/mvm/apps/arboles)  | w3.css    | d3.js  | Responsive. Propone un diseño a dos columnas en PC y una en Móvil. | App      |

El código de los templates y apps se puedes descargar desde la carpeta **[apps/](https://github.com/sanxofon/mvm/tree/master/apps)**

## Salas 3D

Se puede ver una demostración de las salas 3D (en su estado actual) en el siguiente enlace:

- **[SALAS/](https://sanxofon.github.io/mvm/salas/)**

También se pueden ver [TODAS](https://sanxofon.github.io/mvm/salas/todas.html) las imágenes de trabajo de las salas 3D en el visualizador.

## Previsualizador de imágenes equirectangulares 3D

En el siguiente enlace se pueden probar imágenes en formato 2:1 equirectangulares. Basta con *arrastrar* una imagen desde nuestra compu a la ventana del navegador para verla en 3D.

- **[erviewer/](https://sanxofon.github.io/mvm/erviewer/)**

### Resolución de las imágenes de fondo para las salas 360

Todas las imágenes equirectangulares tienen la proporción 2x1. Las imágenes deben tener un tamaño del doble de ancho que de alto.

El despliegue 360 de las imágenes equirectangulares utiliza un proceso de visualización que carga cada área de la esfera que el usuario esté viendo a partir de pequeños mosaicos (tiles), que son pedazos de la imagen de 512x512 pixeles cada uno.

La imagen se recorta en varios cuadraditos y depende del tamaño de la imagen en cuántos cuadraditos de 512x512 se puede llegar a cortar.

Si la imagen tiene suficiente resolución se pueden crear más niveles de profundidad de 1 hasta 4 lo cual permite al usuario acercarce más a la imagen haciendo zoom.

- El nivel 1 genera 6 mosaicos siendo cada uno de ellos un lado del cubo interior.

- El nivel 2 genera 24 imágenes, cuatro para cada cara del cubo.

- El nivel 3 genera 96 mosaicos, 16 mosaicos por cara del cubo.

- Por último, el nivel 4 de zoom genera 384 mosaicos, con 64 mosaicos por cara.

---

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fsanxofon%2Fmvm&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=Visitas&edge_flat=false)](https://sanxofon.github.io/mvm/)
