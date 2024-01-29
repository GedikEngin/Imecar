const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("reportDB.sqlite", (err) => {
	if (err) {
		console.error("Error opening database", err.message);
	} else {
		console.log("Connected to the SQLite database.");
		createTables();
	}
});

function createTables() {
	db.serialize(() => {
		db.run(`
            CREATE TABLE IF NOT EXISTS employee (
                name TEXT PRIMARY KEY
            );
        `);

		db.run(`
		CREATE TABLE IF NOT EXISTS dailyTasks (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			employeeName TEXT,
			startOfWeek DATE,
			dayOfWeek TEXT,
			tasks TEXT,
			FOREIGN KEY (employeeName) REFERENCES employee(name)
		);
        `);

		db.run(
			`
			CREATE TABLE IF NOT EXISTS dailyReports (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				employeeName TEXT,
				startOfWeek DATE,
				dayOfWeek TEXT,
				reports TEXT,
				FOREIGN KEY (employeeName) REFERENCES employee(name)
			);
        `,
			[],
			(err) => {
				if (err) {
					console.error("Error creating tables", err.message);
				} else {
					console.log("Tables created successfully");
				}
			}
		);
	});
}

function closeDatabase() {
	db.close((err) => {
		if (err) {
			console.error("Error closing the database", err.message);
		} else {
			console.log("Database connection closed.");
		}
	});
}

process.on("SIGINT", closeDatabase);
process.on("SIGTERM", closeDatabase);

module.exports = db;
