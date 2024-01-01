"use strict";
const { Model, DataTypes } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Cart_item, {
        foreignKey: "product_id",
      });

      Product.hasMany(models.Checkout_item, {
        foreignKey: "product_id",
      });
    }
  }
  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(), // Use a function to generate a new UUID
        allowNull: false,
        primaryKey: true,
      },
      title: DataTypes.STRING,
      price: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      photo: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
