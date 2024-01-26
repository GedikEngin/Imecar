const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");

const app = express();
const port = 3000; // This can be any port that is free on your system

// Serve static files from the 'src' directory
app.use(express.static("src"));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.post("/send", (req, res) => {
	const message = req.body.message;
	console.log("Message to ESP32:", message);

	fetch("http://192.168.1.118/send", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ message }),
	})
		.then((response) => response.text())
		.then((data) => {
			console.log("Response from ESP32:", data);
			res.send("Message sent to ESP32: " + message);
		})
		.catch((error) => {
			console.error("Error:", error);
			res.status(500).send("An error occurred while sending message to ESP32");
		});
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
});
