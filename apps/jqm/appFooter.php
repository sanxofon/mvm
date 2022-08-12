
<div id="pies" data-role="footer" data-theme="a">
	<h4>Pie de página</h4>
</div><!-- /footer -->

<!-- ZDog animation -->
<script type="text/javascript">
  // Made with Zdog

let isSpinning = true;

let illo = new Zdog.Illustration({
  element: '.zdog-canvas',
  dragRotate: true,
  // stop spinning when drag starts
  onDragStart: function() {
    isSpinning = false;
  },
});

// circle
new Zdog.Ellipse({
  addTo: illo,
  diameter: 140,
  rotate: { y: 90 },
  stroke: 5,
  color: '#333',
});

// square
/*new Zdog.Rect({
  addTo: illo,
  width: 80,
  height: 80,
  translate: { z: -90 },
  stroke: 12,
  color: '#E62',
  fill: true,
});*/

// ball
/*var head = new Zdog.Shape({
  addTo: illo,
  translate: { y: 0, z: 1 },
  color: '#444',
  stroke: 43,
});*/

//M morada
new Zdog.Shape({
  /*path: [
    { x:  40, y: 40 },
    { x:  -40, y: 40 },
    { x:  -40, y: -40 },
    { x:  0, y: 0 },
    { x:  40, y: -40 },
  ],*/
  path: [
    { x:  -30, y: 0 },
    { x:  -40, y: 40 },
    { x:  -40, y: -40 },
    { x:  0, y: 10 },
    { x:  40, y: -40 },
    { x:  40, y: 40 },
    { x:  30, y: 0 },
  ],
  translate: { y: 12, z: -80 },
  color: '#222',
  fill: true,
  stroke: 23,
  addTo: illo,
});

//V azul
new Zdog.Shape({
  path: [
    { x:  0, y: 10 },
    { x: -40, y: -40 },
    { x:  0, y: 40 },
    { x:  40, y: -40 },
  ],
  translate: { y: 12, z: 0 },
  color: '#333',
  fill: true,
  stroke: 23,
  addTo: illo,
});

//M rosa
new Zdog.Shape({
  path: [
    { x:  -30, y: 0 },
    { x:  -40, y: 40 },
    { x:  -40, y: -40 },
    { x:  0, y: 10 },
    { x:  40, y: -40 },
    { x:  40, y: 40 },
    { x:  30, y: 0 },
  ],
  translate: { y: 12, z: 80 },
  color: '#444',
  fill: true,
  stroke: 23,
  addTo: illo,
});

function animate() {
  illo.rotate.y += isSpinning ? 0.005 : 0;
  illo.rotate.x += isSpinning ? 0.01 : 0;
  illo.updateRenderGraph();
  requestAnimationFrame( animate );
}

animate();
</script>

<!-- Initialize Swiper -->
<script type="text/javascript">
const swiper = new Swiper('.swiper', {
  speed: 400,
  spaceBetween: 0,
  // pagination: {
  //   el: ".swiper-pagination",
  //   clickable: true,
  // },
  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev",
  // },
});
</script>

<script type="text/javascript">
var updateTheme = function(newTheme) {
    var rmbtnClasses = '';
    var rmhfClasses = '';
    var rmbdClassess = '';
    var arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's']; // I had themes from a to s

    $.each(arr, function(index, value) {
        rmbtnClasses = rmbtnClasses + ' ui-btn-up-' + value + ' ui-btn-hover-' + value;
        rmhfClasses = rmhfClasses + ' ui-bar-' + value;
        rmbdClassess = rmbdClassess + ' ui-body-' + value + ' ui-page-theme-'+ value;
    });

    // reset all the buttons widgets
    $.mobile.activePage.find('.ui-btn').not('.ui-li-divider').removeClass(rmbtnClasses).addClass('ui-btn-up-' + newTheme).attr('data-theme', newTheme);

    // reset the header/footer widgets
    $.mobile.activePage.find('.ui-header, .ui-footer').removeClass(rmhfClasses).addClass('ui-bar-' + newTheme).attr('data-theme', newTheme);

    // reset the page widget
    $.mobile.activePage.removeClass(rmbdClassess).addClass('ui-body-' + newTheme + ' ui-page-theme-'+ newTheme).attr('data-theme', newTheme);

    // target the list divider elements, then iterate through them and
    // change its theme (this is the jQuery Mobile default for
    // list-dividers)
    $.mobile.activePage.find('.ui-li-divider').each(function(index, obj) {
        $(this).removeClass(rmhfClasses).addClass('ui-bar-' + newTheme).attr('data-theme', newTheme);
    });
};
function CambiarModo(on) {
  if (on==1){
    lista = ['a','b','c','d','e','f','g'];
    $("#fslider").removeClass("ui-state-disabled");
    updateTheme(lista[$('#slider').val()]);
  } else {
    $("#fslider").addClass("ui-state-disabled");
    updateTheme('a');
  }
}
function cambiarFondo(n=0) {
  if($('#flip').val()==1){
    lista = ['a','b','c','d','e','f','g'];
    updateTheme(lista[n]);
  }
}
</script>
<script type="text/javascript">
// Este código verifica si la API del service worker está disponible. Si está disponible, se registra el service worker de /mc/sw.js una vez que se carga la página.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('<?php echo $app_server.$app_path; ?>sw.php').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registrado exitosamente en: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('Error en el registro del ServiceWorker: ', err);
    });
  });
}

// DETECT IF LOCAL STORAGE IS AVAILABLE
function storageAvailable(type) {
  //logDebug(arguments.callee.name);
  var storage;
  try {
    storage = window[type];
    var x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch(e) {
    return e instanceof DOMException && (
    // everything except Firefox
    e.code === 22 ||
    // Firefox
    e.code === 1014 ||
    // test name field too, because code might not be present
    // everything except Firefox
    e.name === 'QuotaExceededError' ||
    // Firefox
    e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
    // acknowledge QuotaExceededError only if there's something already stored
    (storage && storage.length !== 0);
  }
}
function vaciarTodo() {
  if (storageAvailable('localStorage')) {
    //Vaciamos localStorage
    localStorage.clear();
  }
  window.location = "index.php";
}
</script>