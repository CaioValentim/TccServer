"use strict";
module.exports = function(sequelize, DataTypes) {
  var Publication = sequelize.define("Publication", {
    title: DataTypes.STRING,
	textPublic: DataTypes.STRING
  });
  Publication.associate = function(models) {
    // Using additional options like CASCADE etc for demonstration
    // Can also simply do Task.belongsTo(models.User);
    Publication.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  }
  return Publication;
};
