"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chackout_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Chackout_item.hasMany(models.Product, {
        foreignKey: "id",
      });
      Chackout_item.hasMany(models.Shipping, {
        foreignKey: "id",
      });
    }
  }
  Chackout_item.init(
    {
      product_id: DataTypes.STRING,
      shipping_id: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Chackout_item",
    }
  );
  return Chackout_item;
};
