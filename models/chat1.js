const { Sequelize } = require("sequelize");
const db_connection = require("../database/db.js");
const chat = db_connection.define("chat1", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
message:{
    type:Sequelize.STRING,    
},
user_email:{
    type:Sequelize.STRING,    
}


})
module.exports=chat;