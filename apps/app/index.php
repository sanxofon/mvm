<?php
include_once("appConfig.php");
include("appHeader.php");
?>

<div class="w3-content w3-card">
  <h2 class="w3-center"><em><?php echo $app_description; ?></em></h2>
  <div class="w3-center"><a href="appStart.php"><img style="width: 100%;" src="<?php echo $app_server.$app_path."img/launcher-icon-512.png"; ?>"></a></div>
</div>

<?php include_once "appFooter.php"; ?>

</body>
</html>