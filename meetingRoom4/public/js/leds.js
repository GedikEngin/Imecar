// leds.js
document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("redButton").addEventListener("click", function () {
		setLeds(0, 255, 255); // Set LEDs to red
	});

	document.getElementById("greenButton").addEventListener("click", function () {
		setLeds(85, 255, 255); // Set LEDs to green
	});

	function setLeds(hue, saturation, value) {
		var xhr = new XMLHttpRequest();
		xhr.open(
			"GET",
			`http://192.168.4.1:8080/esp32/setLeds?hue=${hue}&saturation=${saturation}&value=${value}`,
			true
		);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					console.log(xhr.responseText);
				} else {
					console.error("Error:", xhr.statusText);
				}
			}
		};
		xhr.send();
	}
});
