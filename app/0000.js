/*

0000: Cardinal client
requires domready and reqwest

4 hex digits = version

3 hex digits = width
3 hex digits = height

for each changed pixel (max 64):
  3 hex digits = x
  3 hex digits = y
  pairs of 00 to ff, denoting color

*/

function drawBoard(canvas, file) {

	// read the context
	var context = canvas.getContext("2d");

	// what's the size?
	var width = parseInt(file.substr(4, 3), 16);
	var height = parseInt(file.substr(7, 3), 16);

	// set the size
	if (width != canvas.width)
		canvas.width = width;
	if (height != canvas.height)
		canvas.height = height;

	// draw time!
	var x, y, color, redBit, greenBit, blueBit, red, green, blue, color24;
	for (var i = 0; i < 512; i ++) {

		// read the color
		x = parseInt(file.substr(10 + (8 * i), 3), 16);
		if (x === "")
			break;
		y = parseInt(file.substr(13 + (8 * i), 3), 16);
		color = parseInt(file.substr(16 + (8 * i), 2), 16);

		// 8-bit color to 24-bit color
		  redBit = Math.floor((color & 224) / 32);
		greenBit = Math.floor((color &  28) / 4);
		 blueBit = Math.floor(color &   3);
		     red = ((redBit + 1) * 2) + (redBit & 1) - 2;
		   green = ((greenBit + 1) * 2) + (greenBit & 1) - 2;
		    blue = ((blueBit + 1) * 4) + (blueBit & 1) - 2;
		color24 = "#" + red.toString(16) + green.toString(16) + blue.toString(16);

		// draw the pixel!
		context.strokeStyle = color24;
		context.beginPath();
		context.moveTo(x, y);
		context.lineTo(x + .5, y + .5);
		context.lineWidth = 1;
		context.stroke();

	}

}

domready(function() {

	// build a canvas
	var canvas = document.createElement("canvas");
	document.body.appendChild(canvas);

	// request from the server
	var doRequest = function() {
		reqwest({
			url: "map.php",
			type: "text",
			success: function(resp) {
				resp = resp.response;
				if (resp.substr(0, 4) != "0000") {
					throw new Error("Version not recognized.");
				}
				drawBoard(canvas, resp);
			}
		});
	};
	setInterval(doRequest, 100);
	doRequest();

});
