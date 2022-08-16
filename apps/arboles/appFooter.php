<!-- Footer -->
<footer class="seccion w3-container w3-padding-64 w3-center w3-opacity w3-light-grey w3-xlarge">
  <p>&copy; (<?php echo $app_year; ?>) <a href="//twitter.com/<?php echo $app_authorTwitter; ?>" target="_blank"><?php echo $app_author; ?></a></p>
</footer>

<!-- Footer scripts -->
<script src="<?php echo $app_server.$app_path; ?>tree.js"></script>
<script>
// Automatic Slideshow - change image every 4 seconds
var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 4000);    
}

// Used to toggle the menu on small screens when clicking on the menu button
function myNav() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else { 
    x.className = x.className.replace(" w3-show", "");
  }
}

// When the user clicks anywhere outside of the modal, close it
var modal = document.getElementById('ticketModal');
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
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