const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
app.use(express.urlencoded({ extended: true }));

// Initialize SQLite database
const db = new sqlite3.Database(
	"./reportDB.sqlite",
	sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
	(err) => {
		if (err) {
			console.error("Error opening database " + err.message);
		} else {
			console.log("Connected to the SQLite database.");
			// Create tables if they don't exist

			// Create dailyReport table
			db.run(`CREATE TABLE IF NOT EXISTS employees (
                employeeID INTEGER PRIMARY KEY AUTOINCREMENT,
                employeeName TEXT
            );
            `);

			db.run(`CREATE TABLE IF NOT EXISTS weekOverview (
                weekID INTEGER PRIMARY KEY AUTOINCREMENT,
                weekBeginning DATE,
                employeeName TEXT,
                FOREIGN KEY (employeeName) REFERENCES employees(employeeName)
            );
            `);

			db.run(`CREATE TABLE IF NOT EXISTS dailyTasks (
                taskID INTEGER PRIMARY KEY AUTOINCREMENT,
                weekID INTEGER,
                dayOfWeek INTEGER,
                taskContent TEXT,
                FOREIGN KEY (weekID) REFERENCES weekOverview(weekID)
            );
            `);

			db.run(`CREATE TABLE IF NOT EXISTS dailyReport (
                reportID INTEGER PRIMARY KEY AUTOINCREMENT,
                taskID INTEGER,
                reportContent TEXT,
                reportDate DATE,
                FOREIGN KEY (taskID) REFERENCES dailyTasks(taskID)
            );
            `);
		}
	}
);

app.post("/api/addEmployee", (req, res) => {
	const { employeeName } = req.body;
	const query = `INSERT INTO employees (employeeName) VALUES (?)`;

	db.run(query, [employeeName], function (err) {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({
			message: "Employee added successfully",
			employeeID: this.lastID,
		});
	});
});

app.post("/api/addWeekOverview", (req, res) => {
	const { weekBeginning, employeeName } = req.body;
	const query = `INSERT INTO weekOverview (weekBeginning, employeeName) VALUES (?, ?)`;

	db.run(query, [weekBeginning, employeeName], function (err) {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({
			message: "Week overview added successfully",
			weekID: this.lastID,
		});
	});
});

app.post("/api/addDailyTask", (req, res) => {
	const { weekID, dayOfWeek, taskContent } = req.body;
	const query = `INSERT INTO dailyTasks (weekID, dayOfWeek, taskContent) VALUES (?, ?, ?)`;

	db.run(query, [weekID, dayOfWeek, taskContent], function (err) {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({ message: "Daily task added successfully", taskID: this.lastID });
	});
});

app.post("/api/addDailyReport", (req, res) => {
	const { taskID, reportContent, reportDate } = req.body;
	const query = `INSERT INTO dailyReport (taskID, reportContent, reportDate) VALUES (?, ?, ?)`;

	db.run(query, [taskID, reportContent, reportDate], function (err) {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({
			message: "Daily report added successfully",
			reportID: this.lastID,
		});
	});
});

app.get("/api/weekOverviews", (req, res) => {
	const { employeeName } = req.query;
	const query = `SELECT * FROM weekOverview WHERE employeeName = ?`;

	db.all(query, [employeeName], (err, rows) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({ message: "Success", data: rows });
	});
});

app.get("/api/dailyTasks", (req, res) => {
	const { weekID } = req.query;
	const query = `SELECT * FROM dailyTasks WHERE weekID = ?`;

	db.all(query, [weekID], (err, rows) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({ message: "Success", data: rows });
	});
});

app.get("/api/dailyReports", (req, res) => {
	const { taskID } = req.query;
	const query = `SELECT * FROM dailyReport WHERE taskID = ?`;

	db.all(query, [taskID], (err, rows) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({ message: "Success", data: rows });
	});
});

const PORT = 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
