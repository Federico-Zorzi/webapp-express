require("dotenv").config();

// MYSQL2
const mysql = require("mysql2");
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// CONNECTION TO DB CONFIGURATION
const connection = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

// RESPONSE FROM THE DB ABOUT CONNECTION
connection.connect((err) => {
  if (err) throw err;
  /*   console.log("Connected to MySQL!"); */
});

module.exports = connection;
