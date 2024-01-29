const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = process.env.PORT || 3000; // Use the specified port or default to 3000

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "..", "public")));

// Database setup
const db = new sqlite3.Database("reportDB.sqlite");

// Express middleware for parsing JSON requests
app.use(express.json());

// Define routes
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "public", "submitReport.html"));
});

// Add more routes as needed, e.g., for other HTML pages

// API to submit a report
app.post("/submitReport", async (req, res) => {
	try {
		// Extract data from the request body
		const { name, startOfWeek, dayOfWeek, comments } = req.body;

		// Perform database operations (insert into 'dailyReports' table)
		await insertReport(name, startOfWeek, dayOfWeek, comments);

		res.json({ message: "Report submitted successfully" });
	} catch (error) {
		console.error("Error submitting report:", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
});

// API to submit tasks
app.post("/submitTask", async (req, res) => {
	try {
		// Extract data from the request body
		const { name, startOfWeek, tasks } = req.body;

		// Perform database operations (insert into 'dailyTasks' table)
		await insertTasks(name, startOfWeek, tasks);

		res.json({ message: "Tasks submitted successfully" });
	} catch (error) {
		console.error("Error submitting tasks:", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
});

// API to read data
app.get("/readData", async (req, res) => {
	try {
		// Extract data from the request query
		const { name, startOfWeek, readType } = req.query;

		// Perform database operations (retrieve data based on readType)
		const data = await readData(name, startOfWeek, readType);

		res.json({ data });
	} catch (error) {
		console.error("Error reading data:", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
});

// Start the server
const server = app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

// Close the database connection when the server is shutting down
process.on("SIGINT", () => {
	db.close((err) => {
		if (err) {
			console.error("Error closing the database:", err.message);
		} else {
			console.log("Database connection closed.");
			server.close(() => {
				console.log("Server shutting down.");
				process.exit(0);
			});
		}
	});
});

// Helper function to insert a report into the 'dailyReports' table
function insertReport(name, startOfWeek, dayOfWeek, comments) {
	return new Promise((resolve, reject) => {
		db.run(
			`
      INSERT INTO dailyReports (weekId, dayOfWeek, reports)
      VALUES ((SELECT id FROM weekOverview WHERE employeeName = ? AND startOfWeek = ?), ?, ?)
    `,
			[name, startOfWeek, dayOfWeek, comments],
			function (err) {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			}
		);
	});
}

// Helper function to insert tasks into the 'dailyTasks' table
function insertTasks(name, startOfWeek, tasks) {
	return new Promise((resolve, reject) => {
		db.run(
			`
      INSERT INTO dailyTasks (weekId, dayOfWeek, tasks)
      VALUES ((SELECT id FROM weekOverview WHERE employeeName = ? AND startOfWeek = ?), ?, ?)
    `,
			[name, startOfWeek, tasks],
			function (err) {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			}
		);
	});
}

// Helper function to read data from the database
function readData(name, startOfWeek, readType) {
	return new Promise((resolve, reject) => {
		// Check readType and construct SQL query accordingly
		let query = "";
		let params = [name, startOfWeek];

		if (readType === "reports") {
			// Query 'dailyReports' table
			query = `
		  SELECT dayOfWeek, reports
		  FROM dailyReports
		  WHERE weekId IN (SELECT id FROM weekOverview WHERE employeeName = ? AND startOfWeek = ?)
		`;
		} else if (readType === "tasks") {
			// Query 'dailyTasks' table
			query = `
		  SELECT dayOfWeek, tasks
		  FROM dailyTasks
		  WHERE weekId IN (SELECT id FROM weekOverview WHERE employeeName = ? AND startOfWeek = ?)
		`;
		} else {
			reject(new Error("Invalid readType"));
			return;
		}

		// Execute the constructed query
		db.all(query, params, (err, rows) => {
			if (err) {
				reject(err);
			} else {
				resolve(rows);
			}
		});
	});
}
