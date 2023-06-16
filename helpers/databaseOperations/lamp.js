const connection = require("../database/connectdatabase");

const addRequest = (usertoken, status) => {
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO logs(device_id, time,status) VALUES ('${Math.random()}','${new Date()}','${status == "true" ? "on":"off"}')`;
    connection.query(query, function (err, result) {
      if (err) throw err;
      resolve(true);
    });
  });
};

module.exports = addRequest;
