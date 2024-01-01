"use strict";
const { Model, DataTypes } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class Cart_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart_item.belongsTo(models.Cart, {
        foreignKey: "cart_id",
      });

      Cart_item.belongsTo(models.Product, {
        foreignKey: "product_id",
      });
    }
  }
  Cart_item.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(), // Use a function to generate a new UUID
        allowNull: false,
        primaryKey: true,
      },
      cart_id: DataTypes.STRING,
      product_id: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cart_item",
    }
  );
  return Cart_item;
};
