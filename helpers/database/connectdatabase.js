var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost", // localhost
  port:"3306",
  database:"iot_control",
  user:  "root",//"server : myuser" local : root, //
  password: "" // server : 1234 local : "" //
});

con.connect(function(err) {
   if (err) throw err;
   console.log("Connected!");
 });

module.exports = con;