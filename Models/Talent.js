const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Talent = sequelize.define('Talent', {
  nom: { type: DataTypes.STRING, allowNull: false },
  categorie: { type: DataTypes.STRING, allowNull: false },
  verified: { type: DataTypes.BOOLEAN, defaultValue: false }
});

Talent.belongsTo(User);
User.hasMany(Talent);

module.exports = Talent;
