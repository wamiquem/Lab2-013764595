'use strict';
var mysql = require('mysql');

var con = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    password: "Wamique1987",
    database : 'grubhub_db',
  });

con.getConnection(function(err) {
    if (err) throw err;
    console.log("Connected Pooling!");
});

module.exports = con;