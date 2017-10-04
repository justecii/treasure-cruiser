'use strict';
module.exports = (sequelize, DataTypes) => {
    var collection = sequelize.define('collection', {
        cardId: DataTypes.STRING,
        userId: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                models.collection.belongsTo(models.user)
            }
        }
    });
    return collection;
};