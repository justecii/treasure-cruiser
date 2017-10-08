'use strict';
module.exports = (sequelize, DataTypes) => {
    var trade = sequelize.define('trade', {
        cardName: DataTypes.STRING,
        price: DataTypes.STRING,
        userId: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                models.trade.belongsTo(models.user)
            }
        }
    });
    return trade;
};