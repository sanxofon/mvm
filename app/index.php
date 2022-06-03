<?php
include_once("appConfig.php");
include("appHeader.php");
?>

  <style>
    body,h1,h2,h3,h4,h5,h6 {font-family: "Lato", sans-serif;}
    body, html {
      height: 100%;
      color: #777;
      line-height: 1.8;
    }

    .w3-wide {letter-spacing: 10px;}
    .w3-hover-opacity {cursor: pointer;}

  </style>
</head>
<body>

<!-- Header -->
<header class="w3-center w3-black w3-padding-64 w3-opacity w3-hover-opacity-off">
  <h1 class="w3-center"><b><?php echo $appname; ?></b> <?php echo $version; ?></h1>
</header>

<div class="w3-content w3-card">
  <h2 class="w3-center"><em><?php echo $description; ?></em></h2>
  <div class="w3-center"><img src="<?php echo $servidor.$ruta."img/launcher-icon-512.png"; ?>"></div>
</div>

<!-- Footer -->
<footer class="w3-center w3-black w3-padding-64 w3-opacity w3-hover-opacity-off">
  <p><b><?php echo $appname; ?></b> - &copy; (2019) Santiago Chávez Novaro</p>
</footer>

<script type="text/javascript">
// Este código verifica si la API del service worker está disponible. Si está disponible, se registra el service worker de /mc/sw.js una vez que se carga la página.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('<?php echo $servidor.$ruta; ?>sw.php').then(function(registration) {
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
  window.location = "appStart.php";
}
</script>

</body>
</html>