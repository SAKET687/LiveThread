const mysql = require("mysql2");

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "password",
	database: "comments_system",
});

db.connect((error) => {
	if (error) {
		console.error("Oops! Something went wrong while connecting to the database. Please check your connection.");
		throw error;
	}
	console.log("🎉 Successfully connected to the MySQL database! Ready to go!");
});

module.exports = db;
