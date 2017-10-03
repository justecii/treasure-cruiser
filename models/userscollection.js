'use strict';
module.exports = (sequelize, DataTypes) => {
  var usersCollection = sequelize.define('usersCollection', {
    userId: DataTypes.INTEGER,
    collectionId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return usersCollection;
};