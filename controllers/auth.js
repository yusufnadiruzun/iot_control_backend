
const sendResponse = require("../helpers/sendResponse/sendResponse");
const { logindb, signupdb,loginTokendb, loginMaildb } = require("../helpers/databaseOperations/auth");
const {generateUserToken,sendTokenToClient} = require("../helpers/authorization/sendTokenToClient");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
    
  const {name,surname,mail,password,googlesubid} = req.body;
  let hashPassword = bcrypt.hashSync(password, 10);
  let usertoken =generateUserToken(name, password);
  return signupdb(name,surname, mail,hashPassword,googlesubid,usertoken)
    .then((result) => sendTokenToClient(name,usertoken,res))
    .catch((err) =>  console.log(err));
};

const login = async (req, res) => {

  const { name,surname,mail,password,googlesubid,usertoken} = req.body;

  if(name != "" && password != "" && usertoken == ""){
  let usertoken =generateUserToken(name, password);
  logindb(name, password)
    .then((result) => sendTokenToClient(name,usertoken, res))
    .catch((err) => sendResponse(res, false, 400, err));
  }
  else if(mail != "" && usertoken == ""){
    let usertoken =generateUserToken(name, password);
    loginMaildb(mail, googlesubid).then((result) => sendTokenToClient(name,usertoken, res))
    .catch((err) => sendResponse(res, false, 400, err));
  }else{
    loginTokendb(usertoken)
    .then((result) => sendTokenToClient(name, usertoken, res))
    .catch((err) => sendResponse(res, false, 400, err));
  } 
};

module.exports = { signup,login };


/*
const authcontrol = (req, res, next) => {
  const { username, password, usertoken } = req.body;

  if (usertoken != undefined && usertoken != null && usertoken != "") {

    var sql = "SELECT * FROM users ";
    
    database.query(sql, function (err, result) {
      if (err) throw err;
      if (result.length > 0) {
        console.log(result);
        for (let i = 0; i < result.length; i++) {
          console.log("for");
          console.log(result[i].usertoken);
          if (bcrypt.compareSync(usertoken, result[i].usertoken)) {
            console.log("userToken found");
            sendTokenToClient(username, usertoken, res);
            return;
          }
        }
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
          sendResponse(
            res,
            false,
            401,
            "Incorrect username or password. Please enter the correct information."
          );
        }
      } else {
        sendResponse(
          res,
          false,
          401,
          "Incorrect username or password. Please enter the correct information."
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
*/