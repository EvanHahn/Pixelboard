<?php

// Cardinal
echo "0000";

// say size
echo "040040";

// place a random dot
$x = time() % 64;
$x = dechex($x);
while (strlen($x) < 3) {
	$x = '0' . $x;
}
$color = rand(0, 255);
$color = dechex($color);
while (strlen($color) < 2) {
	$color = '0' . $color;
}

for ($i = 0; $i < 256; $i ++) {

	$y = $i;
	$y = dechex($y);
	while (strlen($y) < 3) {
		$y = '0' . $y;
	}

	echo $x;
	echo $y;
	echo $color;
}
