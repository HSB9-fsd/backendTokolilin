"use strict";
const { Model, DataTypes } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class Checkout_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Checkout_item.belongsTo(models.Product, {
        foreignKey: "product_id",
      });

      Checkout_item.belongsTo(models.Shipping, {
        foreignKey: "shipping_id",
      });
    }
  }
  Checkout_item.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(), // Use a function to generate a new UUID
        allowNull: false,
        primaryKey: true,
      },
      product_id: DataTypes.STRING,
      shipping_id: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Checkout_item",
    }
  );
  return Checkout_item;
};
