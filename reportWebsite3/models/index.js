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
