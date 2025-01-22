// Koneksi ke Database
const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'YourHostDb', // Local : 192.168.2.222
    user: 'YourUsernameDb',
    password: 'YourPassDb',
    database: 'YourDb'
});

// Tes koneksi database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to MySQL database.');
    }
});

module.exports = db;
