<?php
include_once("appConfig.php");
include("appHeader.php");
?>

<!-- Page content -->
<div class="w3-content" style="max-width:2000px;margin-top:46px">

  <!-- First Grid: Logo & About -->
  <div class="w3-row">
    <div class="fullseccion w3-half w3-black w3-container w3-center" style="height:700px">
      <div>
        <h1 class="w3-wide hpacifico"><?php echo $app_name; ?></h1>
        <p class="w3-opacity"><i><?php echo $app_version; ?></i></p>
      </div>
      <div>
        <!-- Automatic Slideshow Images -->
        <div id="slideshow">
          <div class="mySlides w3-display-container w3-center">
            <img src="images/la.jpg" style="width:50vh;max-width:80vw;">
            <div class="w3-display-bottommiddle w3-container w3-text-white w3-padding-32 w3-hide-small">
              <h3>Los Angeles</h3>
              <p><b>We had the best time playing at Venice Beach!</b></p>   
            </div>
          </div>
          <div class="mySlides w3-display-container w3-center">
            <img src="images/ny.jpg" style="width:50vh;max-width:80vw;">
            <div class="w3-display-bottommiddle w3-container w3-text-white w3-padding-32 w3-hide-small">
              <h3>New York</h3>
              <p><b>The atmosphere in New York is lorem ipsum.</b></p>    
            </div>
          </div>
          <div class="mySlides w3-display-container w3-center">
            <img src="images/chicago.jpg" style="width:50vh;max-width:80vw;">
            <div class="w3-display-bottommiddle w3-container w3-text-white w3-padding-32 w3-hide-small">
              <h3>Chicago</h3>
              <p><b>Thank you, Chicago - A night we won't forget.</b></p>    
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="fullseccion w3-half w3-blue-grey w3-container" style="height:700px" id="comofunciona">
      <div class="w3-padding-16 w3-center">
        <h2>¿Cómo&nbsp;funciona?</h2>
        <img src="images/avatar3.png" class="w3-margin w3-circle" alt="Person" style="width:50%">
        <div class="w3-left-align w3-padding-large">
          <ul class="w3-ul w3-border w3-black izquierda">
            <li>Este script crea árboles de <b>1</b>&gt;<n>n</n>&lt;<b>100</b> vértices al azar y los despliega en un canvas <a href="https://www.w3schools.com/graphics/svg_intro.asp" target="_blank">SVG</a> con <a href="https://d3js.org/" target="_blank">D3js</a>.</li>
            <li>Un nuevo árbol se crea cada <n>t</n> milisegundos si el cuadrito está marcado.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <!-- Second Grid: Work & Resume -->
  <div class="w3-row">
    <div class="fullseccion w3-half w3-light-grey w3-center" id="work">
      <div class="w3-padding-16">
        <h2>Variedades</h2>
        <div class="w3-left-align w3-padding-large">
          <ul class="w3-ul w3-border w3-white izquierda">
            <li>No existe una fórmula conocida para calcular el número de variedades que un árbol puede tener con <n>n</n> vértices.</li>
            <li>Se conoce ese número sólo hasta <n>n</n>=<b>36</b>.<b>*</b></li>
          </ul>
        </div>
      </div>
      <div style="text-align:center;max-width:94%;margin:0 auto;font-size:14px;">
        <table class="w3-table-all tderecha">
          <tr><th class="w3-gray" style="text-align: center;width:100px;"><n style="font-size:1.5em;">n</n></th><th class="w3-gray" style="text-align: center;"># de variedades</th></tr>
        </table>
        <div style="height:200px;overflow:auto;">
          <table class="w3-table-all tderecha">
            <tr><td style="width:100px;">1</td><td>1</td></tr>
            <tr><td>2</td><td>1</td></tr>
            <tr><td>3</td><td>1</td></tr>
            <tr><td>4</td><td>2</td></tr>
            <tr><td>5</td><td>3</td></tr>
            <tr><td>6</td><td>6</td></tr>
            <tr><td>7</td><td>11</td></tr>
            <tr><td>8</td><td>23</td></tr>
            <tr><td>9</td><td>47</td></tr>
            <tr><td>10</td><td>106</td></tr>
            <tr><td>11</td><td>235</td></tr>
            <tr><td>12</td><td>551</td></tr>
            <tr><td>13</td><td>1 301</td></tr>
            <tr><td>14</td><td>3 159</td></tr>
            <tr><td>15</td><td>7 741</td></tr>
            <tr><td>16</td><td>19 320</td></tr>
            <tr><td>17</td><td>48 629</td></tr>
            <tr><td>18</td><td>123 867</td></tr>
            <tr><td>19</td><td>317 955</td></tr>
            <tr><td>20</td><td>823 065</td></tr>
            <tr><td>21</td><td>2 144 505</td></tr>
            <tr><td>22</td><td>5 623 756</td></tr>
            <tr><td>23</td><td>14 828 074</td></tr>
            <tr><td>24</td><td>39 299 897</td></tr>
            <tr><td>25</td><td>104 636 890</td></tr>
            <tr><td>26</td><td>279 793 450</td></tr>
            <tr><td>27</td><td>751 065 460</td></tr>
            <tr><td>28</td><td>2 023 443 032</td></tr>
            <tr><td>29</td><td>5 469 566 585</td></tr>
            <tr><td>30</td><td>14 830 871 802</td></tr>
            <tr><td>31</td><td>40 330 829 030</td></tr>
            <tr><td>32</td><td>109 972 410 221</td></tr>
            <tr><td>33</td><td>300 628 862 480</td></tr>
            <tr><td>34</td><td>823 779 631 721</td></tr>
            <tr><td>35</td><td>2 262 366 343 746</td></tr>
            <tr><td>36</td><td>6 226 306 037 178</td></tr>
          </table>
        </div>
      </div>
      <p class="w3-padding-16 w3-small"><b>*</b> Se puede ver la lista actualizada en <a href="https://oeis.org/A000055" target="_blank">A000055</a> de la <a href="https://oeis.org/" target="_blank">OEIS</a>.</p>
    </div>
    <div class="fullseccion w3-half w3-indigo w3-container">
      <div class="w3-padding-16 w3-center">
        <h2>Resume</h2>
        <p>A draft from my CV</p>

      </div>
    </div>
  </div>


  <!-- The Tour Section -->
  <div class="fullseccion w3-white" id="tour">
    <div class="w3-content w3-padding-16">

      <!-- <button class="w3-button w3-black w3-margin-bottom" onclick="document.getElementById('ticketModal').style.display='block'">Buy Tickets</button><br> -->

      <table style="padding:0;margin:0;display:inline-block;">
        <tr>
          <td><n>n</n></td>
          <td><n>t</n>&nbsp;<input type="checkbox" id="recargar" checked="checked"></td>
          <td colspan="2"></td>
        </tr>
        <tr>
          <td><input class="numero" id="numver" type="number" min="2" max="99" step="1" value="11"></td>
          <td><input class="numero" id="tim" type="number" min="100" max="60000" step="100" value="5000" onchange="tim=this.value;" style="width: 4em;"></td>
          <td><button class="boton" onclick="getData();">&nbsp;&gt;&gt;&nbsp;</button></td>
          <td><input class="numero" id="msg" type="text" readonly="readonly"></td>
        </tr>
      </table>
      <div id="variedades" class="code" style="display:none;"></div>
      <div id="svgcontainer"></div>

    </div>
  </div>

  <!-- Ticket Modal -->
  <div id="ticketModal" class="w3-modal">
    <div class="w3-modal-content w3-animate-top w3-card-4">
      <header class="w3-container w3-teal w3-center w3-padding-32"> 
        <span onclick="document.getElementById('ticketModal').style.display='none'" 
       class="w3-button w3-teal w3-xlarge w3-display-topright">&times;</span>
        <h2 class="w3-wide"><i class="fa fa-suitcase w3-margin-right"></i>Tickets</h2>
      </header>
      <div class="w3-container">
        <p><label><i class="fa fa-shopping-cart"></i> Tickets, $15 per person</label></p>
        <input class="w3-input w3-border" type="text" placeholder="How many?">
        <p><label><i class="fa fa-user"></i> Send To</label></p>
        <input class="w3-input w3-border" type="text" placeholder="Enter email">
        <button class="w3-button w3-block w3-teal w3-padding-16 w3-section w3-right">PAY <i class="fa fa-check"></i></button>
        <button class="w3-button w3-red w3-section" onclick="document.getElementById('ticketModal').style.display='none'">Close <i class="fa fa-remove"></i></button>
        <p class="w3-right">Need <a href="#" class="w3-text-blue">help?</a></p>
      </div>
    </div>
  </div>
  
<!-- End Page Content -->
</div>

<?php include_once "appFooter.php"; ?>

</body>
</html>