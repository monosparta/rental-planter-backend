'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Configs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Deadline: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Rent_Limit: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      User_ID: {
        allowNull: true,
        type: Sequelize.STRING(36),
        references: {
          model: "Users",
          key: "ID",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Configs');
  }
};