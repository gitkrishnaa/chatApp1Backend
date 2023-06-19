const { Sequelize } = require("sequelize");
const db_connection = require("../database/db.js");
const group_members = db_connection.define("groups_and_members_jn", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // member_id: { type: Sequelize.STRING, allowNull: false },
  admin: { type: Sequelize.BOOLEAN, allowNull: false },
  super_admin: { type: Sequelize.BOOLEAN, allowNull: false },

});
module.exports=group_members;