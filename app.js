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
const group=require("./routes/group_route.js")


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
app.use("/group",group)




//database part ................................

// Association

//group relation to user
// const user=require("./models/user.js")
const group_db=require("./models/group_db.js")
const group_user_junction=require("./models/grup_user_juntion.js")
const group_messages=require("./models/group_messge_db_model.js")


//note-problem-> when data fetching the include in findAll 
//not ,return  releted data but if use in such order then 
//working fine
user.hasMany(group_db,{foreignKey:"user_super_admin"})

group_db.belongsToMany(user,{through:group_user_junction})

group_db.belongsTo(user,{foreignKey:"user_super_admin"})

user.belongsToMany(group_db,{through:group_user_junction})



// group_messages.belo




user.hasMany(group_messages);
group_messages.belongsTo(user);

group_db.hasMany(group_messages);
group_messages.belongsTo(group_db);

//first all user v=chat group
chat1_module.hasMany(user);
user.belongsTo(chat1_module)



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



