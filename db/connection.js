const mysql = require("mysql2");
const util = require("util");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Broadway1963!",
    database: "employees"
  });
  
  connection.connect(function(err) {
    if (err) throw err;

  });
  connection.query = util.promisify(connection.query);

  module.exports = connection;