"use strict";
const {Model, DataTypes} = require("sequelize");
const {v4: uuidv4} = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Shipping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Shipping.belongsTo(models.User, {
        foreignKey: "id",
      });
      Shipping.belongsTo(models.Address, {
        foreignKey: "address_id",
      });
      Shipping.hasMany(models.Cart_item, {
        foreignKey: "shipping_id",
      });
      Shipping.hasMany(models.Chackout_item, {
        foreignKey: "shipping_id",
      });
    }
  }
  Shipping.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(), // Use a function to generate a new UUID
        allowNull: false,
        primaryKey: true,
      },

      user_id: DataTypes.UUID,
      address_id: DataTypes.UUID,
      payment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Shipping",
    }
  );
  return Shipping;
};
