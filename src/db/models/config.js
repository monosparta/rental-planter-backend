'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Config extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'User_ID'});
    }
  }
  Config.init(
      {
      ID: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      Deadline: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      Rent_Limit: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      User_ID: {
        type: DataTypes.STRING(36),
        allowNull: true,
        references: {
          model: "Users",
          key: "ID",
        },
      }
      },
      {
          sequelize,
          modelName: 'Config'
      }
  );
  return Config;
};