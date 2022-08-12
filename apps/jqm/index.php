<?php
include_once("appConfig.php");
include("appHeader.php");
?>

<div data-role="page" id="one" data-theme="a">

	<div role="main" class="ui-content">
		<h2>Página Uno</h2>
    <div style="text-align: center;"><canvas class="zdog-canvas" width="240" height="240"></canvas></div>
    <form>
      <label for="flip">Activa el switch:</label>
      <select name="flip" id="flip" data-role="slider" onchange="CambiarModo(this.value);">
          <option value="0">Off</option>
          <option value="1">On</option>
      </select>
    </form>
    <form id="fslider" class="ui-state-disabled" style="max-width:520px!important;">
      <label for="slider">Usa el Slider para cambiar los colores de la plantilla:</label>
      <input type="range" name="slider" id="slider" data-popup-enabled="true" min="1" max="6" value="1" onchange="cambiarFondo(this.value);">
    </form>
    <hr>
    <p>Esta es una plantilla de app (<i>app template</i>) para móviles basada en <i>JQuery Mobile</i>. Es muy fácil de implementar con <i>JQuery</i>  en sus versiones 1 o 2. Tiene una extensa documentación y hay muchos ejemplos en línea para probar.</p>
    <p>Esta plantilla (al igual que las <a href="../" target="_blank">otras</a>) incluye todo lo necesario para funcionar como una <i>Progressive Web App</i> (PWA)
    <hr>
    <p> Las páginas internas abrirse con efectos de transición definidos en el <a href="#two" data-transition="slideup">enlace</a></p>
		<h3>Botones con enlaces a páginas internas:</h3>
		<p><a href="#two" data-transition="slideup" class="ui-btn ui-shadow ui-corner-all ui-btn-inline ui-icon-forward ui-btn-icon-left">Mostrar segunda página</a></p>
		<p><a href="#popup" class="ui-btn ui-shadow ui-corner-all ui-btn-inline ui-icon-action ui-btn-icon-left" data-rel="dialog" data-transition="pop">Mostrar "popup"</a></p>
  
  </div><!-- /content -->

</div><!-- /page one -->

<!-- Start of second page: #two -->
<div data-role="page" id="two" data-theme="a">

	<div role="main" class="ui-content">
		<h2>Página Dos</h2>
    <p>Podemos usar otras librerías JS en combinación con JQuery. En este ejemplo usamos <a href="https://swiperjs.com/" target="_blank">Swiper</a> para hacer sliders de fotos, videos, html, etc..</p>
    
    <!-- Slider main container -->
    <div class="swiper">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide"><img src="images/01.jpg" width="100%"></div>
        <div class="swiper-slide"><img src="images/02.jpg" width="100%"></div>
        <div class="swiper-slide"><img src="images/03.jpg" width="100%"></div>
        <div class="swiper-slide"><img src="images/04.jpg" width="100%"></div>
        <div class="swiper-slide"><img src="images/05.jpg" width="100%"></div>
        <div class="swiper-slide"><img src="images/06.jpg" width="100%"></div>
        <div class="swiper-slide"><img src="images/07.jpg" width="100%"></div>
        <div class="swiper-slide"><img src="images/08.jpg" width="100%"></div>
        ...
      </div>
      <!-- If we need pagination -->
      <!-- <div class="swiper-pagination"></div> -->

      <!-- If we need navigation buttons -->
      <!-- <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div> -->

      <!-- If we need scrollbar -->
      <!-- <div class="swiper-scrollbar"></div> -->
    </div>


    <p>Cualquier cantidad de librerías JS se pueden combinar con alguna <i>framework CSS</i> (<i>JQuery Mobile</i> en este caso) para crear una <i>web app</i>. El término <i>progressive</i> (PWA) es uno usado por <i>Google</i> y que permite en cualquier navegador <i>chromium</i> crear una pseudo app nativa en el escritorio. Intenta instalar esta PWA desde chrome en tu Móvil o PC</p>
		
		<p><a href="#one" data-transition="slideup" data-direction="reverse" class="ui-btn ui-shadow ui-corner-all ui-btn- ui-btn-inline ui-icon-back ui-btn-icon-left">Volver a la página Uno</a></p>

	</div><!-- /content -->

</div><!-- /page two -->

<!-- Start of third page: #popup -->
<div data-role="page" id="popup" data-theme="a">

	<div data-role="header">
		<h1>Aviso</h1>
	</div><!-- /header -->

	<div role="main" class="ui-content" style="background-color:#fff!important;">
		<h2>Popup</h2>
		<p>Aquí va el contenido del recuadro mensaje o modal.</p>
		<p><a href="#one" data-rel="back" class="ui-btn ui-shadow ui-corner-all ui-btn-inline ui-icon-back ui-btn-icon-left">Volver a la página Uno</a></p>
	</div><!-- /content -->

</div><!-- /page popup -->

	<!-- leftpanel museo  -->
<div data-role="panel" id="leftpanel" data-position="left" data-display="overlay" data-theme="a">

      <h3>Panel izquierdo</h3>
      <p>Este panel se coloca a la izquierda con el modo de visualización de superposición. El marcado del panel está <em>después</em> del encabezado, el contenido y el pie de página en el orden de origen.</p>
      <a href="#demo-links" data-rel="close" class="ui-btn ui-shadow ui-corner-all ui-btn-a ui-icon-delete ui-btn-icon-left ui-btn-inline">Cerrar panel</a>

</div><!-- /leftpanel -->

<!-- rightpanel ficha  -->
<div data-role="panel" id="rightpanel" data-position="right" data-display="overlay" data-theme="b">

      <h3>Panel derecho</h3>
      <p>Este panel se coloca a la derecha con el modo de visualización push. El marcado del panel está <em>después</em> del encabezado, el contenido y el pie de página en el orden de origen.</p>
      <a href="#demo-links" data-rel="close" class="ui-btn ui-shadow ui-corner-all ui-btn-a ui-icon-delete ui-btn-icon-left ui-btn-inline">Cerrar panel</a>

</div><!-- /rightpanel -->

<?php include_once "appFooter.php"; ?>

</body>
</html>