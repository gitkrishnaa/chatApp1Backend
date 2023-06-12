require("dotenv").config()

//others package
const cors=require("cors")

const express =require("express")
const mysql=require("mysql2")

//importing local module
const db=require("./database/db.js")

//importing models
const user=require("./models/user.js")
const chat1_module=require("./models/chat1.js")

//import routes
const userRoute=require("./routes/user.js")
const chat1Route=require("./routes/chat1.js")



const app=express()
const PORT=process.env.PORT||4200;
app.get("/",(req,res)=>{
res.send("hi")
})

//cors-it allow to send data and accept request from public wbsites
app.use(cors())

//express.json()- it parse the receiveing value from frontend or api request
app.use(express.json())

//routing
app.use("/user",userRoute)
app.use("/chat",chat1Route)




//database part ................................



chat1_module.hasMany(user);
user.hasMany(chat1_module)


// db.sync({force:true})
db.sync()
.then((data)=>{
console.log("data connected sucessful")
app.listen(PORT,()=>{
    console.log("app started at prot no" ,PORT)
    console.log("adress:",`http://${process.env.HOST}:${PORT}`)
})

})
.catch((err)=>{
    console.log(err)
})