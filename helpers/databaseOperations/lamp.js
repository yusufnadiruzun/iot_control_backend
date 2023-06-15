const connection = require("../database/connectdatabase");

const addRequest = (usertoken, status) => {
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO logs(device_id, time) VALUES ('${Math.random()}','${new Date()}')`;
    connection.query(query, function (err, result) {
      if (err) throw err;
      resolve(true);
    });
  });
};

module.exports = addRequest;
