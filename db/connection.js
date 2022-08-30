// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'empTracker',
  password: 'Shmeeisme@37'
});

// Start server after DB connection
connection.connect((err) => {
    if (err) throw err;
    console.log('Database connected.');
  });

module.exports = connection;