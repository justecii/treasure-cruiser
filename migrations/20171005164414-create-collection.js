'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('collections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cardName: {
        type: Sequelize.STRING
      },
      img: {
        type: Sequelize.STRING
      },
      bigImg: {
        type: Sequelize.STRING
      },
      setName: {
        type: Sequelize.STRING
      },
      multiverseId: {
        type: Sequelize.STRING
      },
      rarity: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('collections');
  }
};