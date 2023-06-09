const { Sequelize } = require("sequelize");
const db_connection = require("../database/db.js");
const user = db_connection.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,

    primaryKey: true,
  },
  name: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  mobile: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
});
module.exports=user;