const express = require("express");
const router = express.Router();
const database = require("../helpers/database/connectdatabase");
var bcrypt = require("bcryptjs");
const sendTokenToClient = require("../helpers/authorization/sendTokenToClient");
const sendResponse = require("../helpers/sendResponse/sendResponse");

const authcontrol = (req, res, next) => {
  const { username, password, usertoken } = req.body;

  if (usertoken != undefined) {
    var sql = "SELECT * FROM users WHERE usertoken = '" + usertoken + "'";

    database.query(sql, function (err, result) {
      if (err) throw err;
      if (result.length > 0) {
        sendTokenToClient(username, usertoken, res);
      } else {
        sendResponse(res, false, 401, "userToken not found");
      }
    });
  } else {
    var sql = "SELECT * FROM users WHERE username = '" + username + "'";
    database.query(sql, function (err, result) {
      if (err) throw err;
      if (result.length > 0) {
        if (bcrypt.compareSync(password, result[0].password)) {
          var newUserToken = bcrypt.hashSync(username + password, 10);
          sendTokenToClient(username, newUserToken, res);
        } else {
            sendResponse(res,false,401,"Incorrect username or password. Please enter the correct information.")
        }
      } else {
        sendResponse(res,false,401,"Incorrect username or password. Please enter the correct information."
        );
      }
    });
  }
};

const emailcontrol = (req, res, next) => {
  const { username, googlesubid } = req.body;
  var sql = `SELECT * FROM users WHERE username = '${username}' and googlesubid = '${googlesubid}'`;
  database.query(sql, function (err, result) {
    if (err) throw err;
    if (result.length > 0) {
      var newUserToken = bcrypt.hashSync(username + googlesubid, 10);
      sendTokenToClient(username, newUserToken, res);
    } else {
      database.query(
        `INSERT INTO users (username,googlesubid) VALUES ('${username}', '${googlesubid}')`,
        function (err, result) {
          if (err) throw err;
          var newUserToken = bcrypt.hashSync(username + googlesubid, 10);
          sendTokenToClient(username, newUserToken, res);
        }
      );
    }
  });
};

const register = (req, res, next) => {
  const { username, password } = req.body;
  var hashPassword = bcrypt.hashSync(password, 10);
  var userToken = bcrypt.hashSync(username + password, 10);

  var sql =
    "INSERT INTO users (username, password,usertoken) VALUES ('" +
    username +
    "', '" +
    hashPassword +
    "', '" +
    userToken +
    "')";
  database.query(sql, function (err, result) {
    if (err) throw err;
    sendTokenToClient(username, userToken, res);
  });
};

module.exports = { authcontrol, register, emailcontrol };
