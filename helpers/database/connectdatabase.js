var mysql = require('mysql');

var con = mysql.createConnection({
  host: "127.0.0.1",
  port:"3306",
  database:"iot_control",
  user: "root",
  password: ""
});

con.connect(function(err) {
   if (err) throw err;
   console.log("Connected!");
 });

module.exports = con;