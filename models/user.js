"use strict";
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
	nome: DataTypes.STRING,
    email: DataTypes.STRING,
	senha: DataTypes.STRING,
	sexo : DataTypes.STRING,
	nascimento : DataTypes.DATEONLY,
	departamento: DataTypes.STRING
  });
  User.associate = function(models) {
    User.hasMany(models.Publication);
  }
  return User;
};
