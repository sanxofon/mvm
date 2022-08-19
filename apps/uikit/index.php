<?php
include_once("appConfig.php");
include("appHeader.php");
?>

<div class="">
  <h2 class=""><em><?php echo $app_description; ?></em></h2>
  <div class=""><a href="appStart.php"><img style="width: 100%;" src="<?php echo $app_server.$app_path."img/launcher-icon-512.png"; ?>"></a></div>
</div>

<?php include_once "appFooter.php"; ?>

</body>
</html>