'use strict';
module.exports = (sequelize, DataTypes) => {
    var collection = sequelize.define('collection', {
        cardName: DataTypes.STRING,
        img: DataTypes.STRING,
        bigImg: DataTypes.STRING,
        setName: DataTypes.STRING,
        multiverseId: DataTypes.STRING,
        rarity: DataTypes.STRING,
        price: DataTypes.STRING,
        userId: DataTypes.INTEGER
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