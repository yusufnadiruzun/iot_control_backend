const express = require("express")
const router = express.Router()
const database = require("../helpers/connectdatabase")
var bcrypt = require('bcryptjs');

const authcontrol = (req,res,next) =>{

    const {username,password} = req.body;
    var sql = "SELECT * FROM users WHERE username = '"+username+"'";
    database.query(sql, function (err, result) {
        if (err) throw err;
        if(result.length > 0){
            if(bcrypt.compareSync(password, result[0].password)){
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({key:"value"}));
            }else{
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({key:"value"}));
            }
        }else{
            res.send("user not found")
        }
      } 
    );
}

const emailcontrol = (req,res,next) =>{
    const {username,googlesubid} = req.body;
    var sql = `SELECT * FROM users WHERE username = '${username}' and googlesubid = '${googlesubid}'`
    database.query(sql, function (err, result) {
        if (err) throw err;
        if(result.length > 0){
            res.send("email already exist")
        }else{
            
            database.query(`INSERT INTO users (username,googlesubid) VALUES ('${username}', '${googlesubid}')`, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
              }
            );
            res.send("email not found, added to database")
        }
        }
    );
}

const register = (req,res,next) =>{
    
    const {username,password} = req.body;
    var hash = bcrypt.hashSync(password, 10);

    var sql = "INSERT INTO users (username, password) VALUES ('"+username+"', '"+hash+"')";
    database.query(sql, function (err, result) {
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({result:"success"}));
      });
  

}

module.exports = {authcontrol,register,emailcontrol};