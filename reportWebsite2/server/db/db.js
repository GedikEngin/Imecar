const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("reportDB.sqlite");

// Execute the SQL script
db.serialize(() => {
	// Create employee table
	db.run(`
    CREATE TABLE IF NOT EXISTS employee (
      name TEXT PRIMARY KEY
    );
  `);

	// Create weekOverview table
	db.run(`
    CREATE TABLE IF NOT EXISTS weekOverview (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      employeeName TEXT,
      startOfWeek DATE,
      FOREIGN KEY (employeeName) REFERENCES employee(name)
    );
  `);

	// Create dailyTasks table
	db.run(`
    CREATE TABLE IF NOT EXISTS dailyTasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      weekId INTEGER,
      dayOfWeek TEXT,
      tasks TEXT,
      FOREIGN KEY (weekId) REFERENCES weekOverview(id)
    );
  `);

	// Create dailyReports table
	db.run(`
    CREATE TABLE IF NOT EXISTS dailyReports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      weekId INTEGER,
      dayOfWeek TEXT,
      reports TEXT,
      FOREIGN KEY (weekId) REFERENCES weekOverview(id)
    );
  `);
});

// Close the database connection
db.close();
