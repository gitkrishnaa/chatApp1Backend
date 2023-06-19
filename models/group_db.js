const { Sequelize } = require("sequelize");
const db_connection = require("../database/db.js");
const Group_info = db_connection.define("groups", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: Sequelize.STRING,
    unique:false,

    allowNull: false,
  },
  logo: {
    type: Sequelize.STRING,
    unique:false,
    allowNull: false,
  },
  super_admin_email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports=Group_info;