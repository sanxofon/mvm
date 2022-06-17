# Museo de matemáticas en línea

Este museo pretende albergar distintas web-apps dispuestas en distintas salas, con curaduría, interactividad y la posibilidad de profundizar más con artículos en "blocks de notas" interactivos y editables. Las salas del museo serán temáticas, por orientación etérea, etc. y contendrán 5 apps cada una. El formato de las salas será de navegación 360° en base a fondos equirectangulares dibujados a mano sobre guías de estructuras creadas como objetos 3D en ordenador.

## Salas 3D

Se puede ver una demostración de las salas 3D en el siguiente enlace:

- **[salas/](./salas/)**

## Plantilla vacía para crear una Web App

**versión 0.5**

El template de Progressive We App (vacío) se puede descargar desde la carpeta:

- **[app/](./app/)**.

## Resolución de las imágenes de fondo para las salas 360

Todas las imágenes equirectangulares tienen la proporción 2x1. Las imágenes deben tener un tamaño del doble de ancho que de alto.

El despliegue 360 de las imágenes equirectangulares utiliza un proceso de visualización que carga cada área de la esfera que el usuario esté viendo a partir de pequeños mosaicos (tiles), que son pedazos de la imagen de 512x512 pixeles cada uno.

La imagen se recorta en varios cuadraditos y depende del tamaño de la imagen en cuántos cuadraditos de 512x512 se puede llegar a cortar.

Si la imagen tiene suficiente resolución se pueden crear más niveles de profundidad de 1 hasta 4 lo cual permite al usuario acercarce más a la imagen haciendo zoom.

- El nivel 1 genera 6 mosaicos siendo cada uno de ellos un lado del cubo interior.

- El nivel 2 genera 24 imágenes, cuatro para cada cara del cubo.

- El nivel 3 genera 96 mosaicos, 16 mosaicos por cara del cubo.

- Por último, el nivel 4 de zoom genera 384 mosaicos, con 64 mosaicos por cara.

Subí unos ejemplos de diferencias de resolución con imágenes de internet de más a menos resolución.

**4 Niveles**

  1. cima-15000x7500 [Ver 360](https://sanxofon.github.io/museomates/salas/#0-cima-15000x7500) / [Ver imagen original](er/cima-15000x7500.jpg)

**3 Niveles**

  2. maquina-9000x4500 [Ver 360](https://sanxofon.github.io/museomates/salas/#1-maquina-9000x4500) / [Ver imagen original](er/maquina-9000x4500.jpg)
  3. donceles-6000x3000 [Ver 360](https://sanxofon.github.io/museomates/salas/#2-donceles-6000x3000) / [Ver imagen original](er/donceles-6000x3000.jpg)
  4. taller-6000x3000 [Ver 360](https://sanxofon.github.io/museomates/salas/#3-taller-6000x3000) / [Ver imagen original](er/taller-6000x3000.jpg)

**2 Niveles**

  5. puerto-4000x2000 [Ver 360](https://sanxofon.github.io/museomates/salas/#4-puerto-4000x2000) / [Ver imagen original](er/puerto-4000x2000.jpg)
  6. gato-3000x1500 [Ver 360](https://sanxofon.github.io/museomates/salas/#5-gato-3000x1500) / [Ver imagen original](er/gato-3000x1500.jpg)

**1 Nivel**

  7. dibujo-2500x1250 [Ver 360](https://sanxofon.github.io/museomates/salas/#6-dibujo-2500x1250) / [Ver imagen original](er/dibujo-2500x1250.jpg)
  8. esferas-1600x800 [Ver 360](https://sanxofon.github.io/museomates/salas/#7-esferas-1600x800) / [Ver imagen original](er/esferas-1600x800.jpg)
  9. penta-1600x800 [Ver 360](https://sanxofon.github.io/museomates/salas/#8-penta-1600x800) / [Ver imagen original](er/penta-1600x800.jpg)

## Tipos de proyección posibles para generar esquemas

Hay dos tipos de proyección posibles para generar las imágenes o los esquemas 3D.

### Equirectangular

Esta forma ocupa toda la extensión de la imagen para guardar pixeles. Es contínuo y muestra las rectas como curvas.

![Máquina - Equirectangular](er/maquina-9000x4500.jpg)

### Las 6 caras de un cubo

Se trata de 6 imágenes cuadradas. Cada una de ellas es la vista plana en una dirección. Arriba, abajo, izquierda, derecha, atrás y adelante. Cada imagen el plana y rectilíne pero los ángulos cambian de cara a cara del cubo.

![Máquina - 6 Caras del cubo](er/maquina-cubo-lowres.jpg)