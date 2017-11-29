<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
	<body>
		<form method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
			Name: <input type="text" name="fname">
					<input type="submit">
	</form>

		<?php
			$name = $_REQUEST["fname"];
			echo $name;
		?> 

		<a href="test.php?subject=php&web=ruboob.com">test $_GET</a>
		<?php 
			// php中的冒泡排序
			$arr=array(5,3,6,2,8,10);
			for ($i=count($arr)-1; $i >= 0 ; $i--) { 
				for ($j=0; $j < $i; $j++) { 
					if ($arr[$j+1]>$arr[$j]) {
						$aa=$arr[$j+1];
						$arr[$j+1]=$arr[$j];
						$arr[$j]=$aa;
					}
				}
			}
			print_r($arr);
		 ?>


	</body>
</html>
