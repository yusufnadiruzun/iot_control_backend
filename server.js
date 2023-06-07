const express = require("express");
const routes = require("./routes/index")
const dotenv = require('dotenv').config({path : "./config/config.env"});
const cors = require("cors");
const app = express();

const port = process.env.PORT ;

app.use(cors());
app.use(express.json())
app.use("/api", routes)
app.use(express.static("public"));

app.listen(port,()=>{
    console.log("server has started at " + port)
})

// app.get("/auth",(req,res,next) =>{
//     res.send("success")
// })