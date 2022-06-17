
const express=require("express");
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const homeRouter=require("./routers/homeRouter")
const port=process.env.port || 3001


const app=express();

//Db Connection
mongoose.connect("mongodb://localhost:27017/employeesData",{useNewUrlParser:true})
const db=mongoose.connection;

db.on("error",()=>{console.log("error in connection")})
db.once("open",()=>{console.log("connected")})

app.set("view engine","ejs")

app.use(express.static("public"))


// app.get("/",(req,res)=>{
//     res.send("hello welcome")
// });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use("/",homeRouter)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})