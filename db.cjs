const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "feast_user",
  password: "YourStrongPassword123!",
  database: "feast_finder"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL Database");
});

module.exports = db;
