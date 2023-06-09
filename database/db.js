const mysql=require("mysql2")
const { Sequelize } = require("sequelize")

//connecting to database
const sequelizeConnection=new Sequelize("chatApp1","root","123456",{
    dialect:"mysql",
    host:"localHost"
})
// console.log(sequelizeConnection)

module.exports=sequelizeConnection