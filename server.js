const express = require("express");
const routes = require("./routes/index")

const app = express();

const port = 5000;

app.use(express.json())
app.use("/api", routes)
app.use(express.static("public"));

app.listen(port, ()=>{
    console.log("server has started at 5000")
})

// app.get("/auth",(req,res,next) =>{
//     res.send("success")
// })