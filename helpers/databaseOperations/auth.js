const connection = require("../database/connectdatabase");
const bcrypt = require("bcryptjs");

const signupdb = (name,surname,mail,hashpassword,phone,usertoken) => {
  return new Promise((resolve, reject) => {
    var query = "SELECT * FROM users where mail='" + mail + "'";
    connection.query(query, function (err, result) {
      if (err) throw err;
      if (result.length != 0) {
        reject("Bu mail adresi zaten kayıtlı");
      } else {  
    query =
      "INSERT INTO users (name, surname,mail,password,phone, usertoken) VALUES ('" +name +"', '" +surname +"', '" +mail +"', '" +hashpassword +
      "', '" +phone +"', '" +usertoken +"')";
    connection.query(query, function (err, result) {
      if (err) throw err;
      resolve(true);
    })
  }})
})
} 

const logindb = (mail, password) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM users where mail='${mail}'`;
    connection.query(query, function (err, result) {
      if (err) throw err;
      if (result.length == 0) {
        reject("Kullanıcı adı veya şifre hatalı");
      } else {
        if (bcrypt.compareSync(password, result[0].password)) {
          let array = [result[0].mail,result[0].name,result[0].surname,result[0].usertoken];
          resolve(array);
        } else {
          reject("Kullanıcı adı veya şifre hatalı");
        }
      }
    });
  });
};
const loginMaildb = (mail) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM users where mail='${mail}'`;
    connection.query(query, function (err, result) {
      if(err) throw err;
      if(result.length == 0) {
       return reject("mail bulunamadı");
      } else {
        
        let array = [result[0].mail,result[0].name,result[0].surname,result[0].usertoken];
        return resolve(array);
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
          if (usertoken==result[i].usertoken) {
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
