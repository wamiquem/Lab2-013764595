'use strict';
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Wamique1987",
    database : 'grubhub_db',
  });

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected no pooling!");
});

module.exports = con;