var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'XFaSfdu*535UPSHgY3gsxm8j9j$T7O8n',
    database: "venturetmp",
  });


connection.connect();

module.exports = connection;