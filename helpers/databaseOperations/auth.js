const connection = require("../database/connectdatabase");
const bcrypt = require("bcryptjs");

const signupdb = (name,surname,mail,hashpassword,googlesubid,usertoken) => {
  return new Promise((resolve, reject) => {
    var query =
      "INSERT INTO users (name, surname,mail,password,googlesubid, usertoken) VALUES ('" +name +"', '" +surname +"', '" +mail +"', '" +hashpassword +
      "', '" +googlesubid +"', '" +usertoken +"')";
    connection.query(query, function (err, result) {
      if (err) throw err;
      resolve(true);
    });
  });
};

const logindb = (name, password) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM users where name='${name}'`;
    connection.query(query, function (err, result) {
      if (err) throw err;
      if (result.length == 0) {
        reject("Kullanıcı adı veya şifre hatalı");
      } else {
        if (bcrypt.compareSync(password, result[0].password)) {
          resolve(true);
        } else {
          reject("Kullanıcı adı veya şifre hatalı");
        }
      }
    });
  });
};
const loginMaildb = (mail, googlesubid) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM users where mail='${mail}' and googlesubid='${googlesubid}'`;
    connection.query(query, function (err, result) {
      if(err) throw err;
      if(result.length == 0) {
        reject("mail bulunamadı");
      } else {
        resolve(true); 
      }
    });
  });
};

const loginTokendb = (usertoken) => {
  return new Promise((resolve, reject) => {
    let query = `select * from users`;
    connection.query(query, function (err, result) {
      if (err) throw err;
      if (result.length == 0) {
        reject("userToken not found");
      } else {
        for (let i = 0; i < result.length; i++) {
          console.log(usertoken, result[i].usertoken)
          if (usertoken ==  result[i].usertoken) {
            console.log(usertoken, result[i].usertoken) 
            resolve(result[i]);
            return;
          }
        }
        reject("userToken not found");
      }
    });
  });
};

module.exports = {
  signupdb,
  logindb,
  loginTokendb,
  loginMaildb
};
