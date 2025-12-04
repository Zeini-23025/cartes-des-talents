const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("User", {
  firstname: DataTypes.STRING,
  lastname: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING,

  skills: DataTypes.ARRAY(DataTypes.STRING),
  languages: DataTypes.ARRAY(DataTypes.STRING),
  passions: DataTypes.ARRAY(DataTypes.STRING),
  projects: DataTypes.ARRAY(DataTypes.STRING),

  talent_verified: { type: DataTypes.BOOLEAN, defaultValue: false }
});

module.exports = User;
