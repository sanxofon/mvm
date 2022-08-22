<?php
include_once("appConfig.php");
include("appHeader.php");
?>

<nav class="uk-navbar-container uk-light" uk-sticky uk-navbar style="height: 40px;">
  <div class="uk-navbar-left">
    <div class="uk-navbar-item">
      <a class="uk-logo" href="#offcanvas-usage" uk-toggle><img style="height:100px;margin-top:-30px;" src="images/logo.png"></a>
    </div>
  </div>
  <div class="uk-navbar-center">
    <ul class="uk-nav">
      <li class="titulo"><?php echo $app_shortname; ?></li>
    </ul>
  </div>
  <div class="uk-navbar-right">
    <span uk-icon="icon: grid" class="boton"></span>
    <ul uk-dropdown="animation: uk-animation-slide-right; animate-out: true;offset: 10;mode: click" class="uk-nav uk-dropdown-nav uk-nav-secondary uk-background-secondary">
        <li class="uk-active"><a href="#">Active</a></li>
        <li class="uk-nav-divider"></li>
        <li><a href="#"><span class="uk-margin-small-right" uk-icon="icon: table"></span> Item</a></li>
        <li><a href="#"><span class="uk-margin-small-right" uk-icon="icon: thumbnails"></span> Item</a></li>
        <li class="uk-nav-divider"></li>
        <li><a href="#"><span class="uk-margin-small-right" uk-icon="icon: trash"></span> Item</a></li>
    </ul>
  </div>
</nav>

<div id="offcanvas-usage" uk-offcanvas>
    <div class="uk-offcanvas-bar">

        <button class="uk-offcanvas-close" type="button" uk-close></button>

        <h3>Title</h3>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

    </div>
</div>

<br><br>

<div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1" uk-slider="clsActivated: uk-transition-active; center: true">
  <ul class="uk-slider-items uk-grid">
    <li class="uk-width-3-4">
      <div class="uk-panel">
        <img src="images/photo.jpg" width="1800" height="1200" alt="">
        <div class="uk-overlay uk-overlay-primary uk-position-bottom uk-text-center uk-transition-slide-bottom">
          <h3 class="uk-margin-remove"><span uk-icon="lifesaver"></span> Lifesaver</h3>
          <p class="uk-margin-remove">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
    </li>
    <li class="uk-width-3-4">
      <div class="uk-panel">
        <img src="images/dark.jpg" width="1800" height="1200" alt="">
        <div class="uk-overlay uk-overlay-primary uk-position-bottom uk-text-center uk-transition-slide-bottom">
          <h3 class="uk-margin-remove"><span uk-icon="world"></span> World</h3>
          <p class="uk-margin-remove">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
    </li>
    <li class="uk-width-3-4">
      <div class="uk-panel">
        <img src="images/light.jpg" width="1800" height="1200" alt="">
        <div class="uk-overlay uk-overlay-primary uk-position-bottom uk-text-center uk-transition-slide-bottom">
          <h3 class="uk-margin-remove"><span uk-icon="laptop"></span> Laptop</h3>
          <p class="uk-margin-remove">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
    </li>
    <li class="uk-width-3-4">
      <div class="uk-panel">
        <img src="images/photo2.jpg" width="1800" height="1200" alt="">
        <div class="uk-overlay uk-overlay-primary uk-position-bottom uk-text-center uk-transition-slide-bottom">
          <h3 class="uk-margin-remove"><span uk-icon="server"></span> Server</h3>
          <p class="uk-margin-remove">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
    </li>
    <li class="uk-width-3-4">
      <div class="uk-panel">
        <img src="images/photo3.jpg" width="1800" height="1200" alt="">
        <div class="uk-overlay uk-overlay-primary uk-position-bottom uk-text-center uk-transition-slide-bottom">
          <h3 class="uk-margin-remove"><span uk-icon="database"></span> Database</h3>
          <p class="uk-margin-remove">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
    </li>
  </ul>
  <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slider-item="previous"></a>
  <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slider-item="next"></a>
</div>

<br><br>

<div class="uk-child-width-1-2@m" uk-grid>
  <div>
    <div class="uk-card uk-card-default">
      <div class="uk-card-media-top">
        <img src="images/light.jpg" width="1800" height="1200" alt="">
      </div>
      <div class="uk-card-body">
        <h3 class="uk-card-title">Media Top</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
      </div>
    </div>
  </div>
  <div>
    <div class="uk-card uk-card-default">
      <div class="uk-card-body">
        <h3 class="uk-card-title">Media Bottom</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
      </div>
      <div class="uk-card-media-bottom">
        <img src="images/light.jpg" width="1800" height="1200" alt="">
      </div>
    </div>
  </div>
</div>

<br><br>

<div class="uk-child-width-1-2@m uk-grid-match" uk-grid>
  <div>
    <div class="uk-card uk-card-default uk-card-body derechar" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
      <h3 class="uk-card-title">Left<span uk-icon="triangle-right"></span></h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
  </div>
  <div>
    <div class="uk-card uk-card-default uk-card-body izquierdar" uk-scrollspy="cls: uk-animation-slide-right; repeat: true">
      <h3 class="uk-card-title"><span uk-icon="triangle-left"></span>Right</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
  </div>
</div>

<?php include_once "appFooter.php"; ?>

</body>

</html>