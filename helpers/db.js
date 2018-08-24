var mysql = require('mysql');
var keys = require("./keys");

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: keys.mysql.password,
    database: "venturetmp",
  });


connection.connect();

module.exports = connection;