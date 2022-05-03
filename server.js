
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require("inquirer");
require("console.table");

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // {TODO: Add your MySQL password}
        password: '12345678',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
    );

// Query database
let deletedRow = 2;

db.query(`DELETE FROM books WHERE id = ?`, deletedRow, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// Query database
db.query('SELECT * FROM books', function (err, results) {
  console.log(results);
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});
