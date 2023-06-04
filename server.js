const express = require("express");
const auth = require("./routers/auth")
const operations = require("./routers/operations")
const con = require("./mysql")

con;
const app = express();
const router = express.Router();

const port = 5000;

app.use("/auth", auth)
app.use("/operations",operations)

app.listen(port, ()=>{
    console.log("server has started at 5000")
})


// app.get("/auth",(req,res,next) =>{
//     res.send("success")
// })