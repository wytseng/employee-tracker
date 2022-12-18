const mysql = require('mysql2');
require('dotenv').config();

// Established connection with the database
// Uses .env to hide password.
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: "employees_db",
})

module.exports = db