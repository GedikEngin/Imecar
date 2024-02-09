const dbConfig = require(`../config/dbConfig.js`); // requiring db configs

const { Sequelize, DataTypes } = require(`sequelize`); // requirements

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	// creating new sequelize instance constructor

	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	operatorsAliases: false,

	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle,
	},
	logging: true,
});

// authentication
sequelize
	.authenticate()
	.then(() => {
		console.log(`connected..`);
	})

	.catch((err) => {
		console.log(`error` + err);
	});

const db = {};

db.Sequelize = Sequelize; // the constructor that is being constructed
db.sequelize = sequelize;

db.meetings = require(`./meetingList.js`)(sequelize, DataTypes); // matches the sequelize new
db.users = require(`./userData.js`)(sequelize, DataTypes); // for later if auth needed

db.sequelize
	.sync({ force: false }) // prevents forced syncing, avoids syncing empty tables etc, create if not exist type of logic
	.then(() => {
		console.log(`resync successful`);
	});

module.exports = db;
