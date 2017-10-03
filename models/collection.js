'use strict';
module.exports = (sequelize, DataTypes) => {
    var collection = sequelize.define('collection', {
        card: DataTypes.STRING,
        version: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                models.collection.belongsToMany(models.user, { through: "usersCollections" })
            }
        }
    });
    return collection;
};