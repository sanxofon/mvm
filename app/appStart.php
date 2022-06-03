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

<div class="w3-content w3-card">
  <h1 class="w3-center"><b><?php echo $appname; ?></b> <?php echo $version; ?></h1>
  <h2 class="w3-center"><em>START</em></h2>
</div>

<!-- Footer -->
<footer class="w3-center w3-black w3-padding-64 w3-opacity w3-hover-opacity-off">
  <p><b><?php echo $appname; ?></b> - &copy; (2019) Santiago Chávez Novaro</p>
</footer>

</body>
</html>