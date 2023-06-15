
const sendResponse = require("../helpers/sendResponse/sendResponse");
const { logindb, signupdb,loginTokendb, loginMaildb } = require("../helpers/databaseOperations/auth");
const {generateUserToken,sendTokenToClient} = require("../helpers/authorization/sendTokenToClient");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
    
  const {name,surname,mail,password,phone} = req.body;
  let hashPassword = bcrypt.hashSync(password, 10);
  let usertoken =generateUserToken(name, password);
  return signupdb(name,surname, mail,hashPassword,phone,usertoken)
    .then((result) => sendTokenToClient(name,surname,usertoken,res))
    .catch((err) =>  console.log(err));
};

const login = async (req, res) => {

  const {name,mail,password,googlesubid,usertoken} = req.body;

  if(mail != "" && password != "" && usertoken == ""){
  console.log("ilk if ")
  logindb(mail, password)
    .then((result) => sendTokenToClient(result[0],result[1],result[2], res))
    .catch((err) => sendResponse(res, false, 400, err));
  }
  else if(mail != "" && usertoken == ""){
    loginMaildb(mail).then((result) => sendTokenToClient(result[0],result[1],result[2], res))
    .catch((err) => sendResponse(res, false, 400, err));
  }else{
    loginTokendb(usertoken)
    .then((result) => sendTokenToClient(result.name,result.surname, result.usertoken, res))
    .catch((err) => sendResponse(res, false, 400, err));
  } 
};

module.exports = { signup,login };

