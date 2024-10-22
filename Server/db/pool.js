const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'new_password',
    database:'wtproject',
    connectionLimit:10
})

module.exports = pool