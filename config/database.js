// Koneksi ke Database
const mysql = require('mysql2');
const db = mysql.createConnection({
    host: '192.168.2.222', // Local : 192.168.2.222
    user: 'user1',
    password: 'countapi#1234@PP',
    database: 'db_api'
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
