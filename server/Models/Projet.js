const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Projet = sequelize.define('Projet', {
  nom: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  status: { type: DataTypes.STRING, defaultValue: 'active' }
});

Projet.belongsTo(User);
User.hasMany(Projet);

module.exports = Projet;

