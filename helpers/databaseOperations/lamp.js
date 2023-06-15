const connection = require("../database/connectdatabase");

const addRequest = (usertoken,status) => {
    return new Promise((resolve, reject) => {
        
        let query = `SELECT * FROM users where usertoken='${usertoken}'`;
        connection.query(query, function (err, result) {
            if (err) throw err;
            if (result.length == 0) {
                reject("usertoken bulunamadi");
            } else {
                
        let query = `INSERT INTO lamp_requests (user_id, lamp_id, request_time,status) VALUES ('${result[0].user_id}','${1}','${new Date()}','${status == "true" ? "on" : "off"}')`;
        connection.query(query, function (err, result) {
            if (err) throw err;
            resolve(true);
        }
        );
    }});
})};

module.exports = addRequest ;
