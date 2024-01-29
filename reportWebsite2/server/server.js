const express = require("express");
const path = require("path");
const db = require("./db");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "submitReport.html"));
});

function isMonday(dateString) {
	const date = new Date(dateString);
	return date.getDay() === 1; // 1 for Monday
}

// Endpoint to submit a report
app.post("/submitReport", (req, res) => {
	const { name, startOfWeek, dayOfWeek, comments } = req.body;

	if (!isMonday(startOfWeek)) {
		return res
			.status(400)
			.json({ error: "The start of the week must be a Monday." });
	}

	const insertReportSql = `
        INSERT INTO dailyReports (employeeName, startOfWeek, dayOfWeek, reports)
        VALUES (?, ?, ?, ?)
    `;
	const reportParams = [name, startOfWeek, dayOfWeek, comments];

	db.run(insertReportSql, reportParams, function (err) {
		if (err) {
			console.error("Error submitting report:", err.message);
			res.status(500).json({ error: "Internal server error" });
		} else {
			res.json({
				message: "Report submitted successfully",
				reportId: this.lastID,
			});
		}
	});
});

// Endpoint to submit tasks
app.post("/submitTask", (req, res) => {
	const { name, startOfWeek, tasks } = req.body;

	if (!isMonday(startOfWeek)) {
		return res
			.status(400)
			.json({ error: "The start of the week must be a Monday." });
	}

	tasks.forEach((task) => {
		const insertTaskSql = `
            INSERT INTO dailyTasks (employeeName, startOfWeek, dayOfWeek, tasks)
            VALUES (?, ?, ?, ?)
        `;
		const taskParams = [name, startOfWeek, task.dayOfWeek, task.description];

		db.run(insertTaskSql, taskParams, function (err) {
			if (err) {
				console.error("Error submitting task:", err.message);
				// This should really be handled differently as this will try to send multiple responses
				res.status(500).json({ error: "Internal server error" });
				return;
			}
		});
	});

	// Send response after all tasks have been processed
	res.json({ message: "Tasks submitted successfully" });
});

// Endpoint to read data
// Endpoint to read data
app.get("/readData", (req, res) => {
	const { name, startOfWeek, readType } = req.query;
	if (!name || !startOfWeek || !readType) {
		return res.status(400).json({ error: "Missing required fields." });
	}

	const tableName = readType === "reports" ? "dailyReports" : "dailyTasks";
	const sql = `
        SELECT dayOfWeek, ${readType} AS data
        FROM ${tableName}
        WHERE employeeName = ? AND startOfWeek = ?
        ORDER BY dayOfWeek
    `;
	const params = [name, startOfWeek];

	db.all(sql, params, (err, rows) => {
		if (err) {
			console.error("Error reading data:", err.message);
			res.status(500).json({ error: "Internal server error" });
		} else {
			res.json({ data: rows });
		}
	});
});

const server = app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

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

// Removed the module.exports = app; it's not necessary unless you're doing integration testing
