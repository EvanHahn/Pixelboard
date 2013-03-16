<?php

// Cardinal
echo "0000";

// say size
echo "100100";

// place a random dot
for ($i = 0; $i < 512; $i ++) {

	$x = rand(0, 255) . '';
	$x = dechex($x);
	while (strlen($x) < 3) {
		$x = '0' . $x;
	}

	$y = rand(0, 255) . '';
	$y = dechex($y);
	while (strlen($y) < 3) {
		$y = '0' . $y;
	}

	$color = rand(0, 255) . '';
	$color = dechex($color);
	while (strlen($color) < 2) {
		$color = '0' . $color;
	}

	echo $x;
	echo $y;
	echo $color;
}
