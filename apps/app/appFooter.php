
<!-- Footer -->
<footer class="w3-center w3-black w3-padding-64 w3-opacity w3-hover-opacity-off">
  <p><b><?php echo $app_name; ?></b> - &copy; (<?php echo $app_year; ?>) <a href="//twitter.com/<?php echo $app_authorTwitter; ?>" target="_blank"><?php echo $app_author; ?></a></p>
</footer>

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