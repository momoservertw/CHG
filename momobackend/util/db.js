// get the client

const mysql = require('mysql2');
const info = require('./config/info');


// create pool~~
const pool = mysql.createPool({
    host: info.host,
    user: info.user,
    database: info.database,
    password: info.password
})

module.exports = pool.promise();