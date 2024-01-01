"use strict";
const { Model, DataTypes } = require("sequelize");
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.belongsTo(models.User, {
        foreignKey: "user_id",
      });

      Address.hasMany(models.Shipping, {
        foreignKey: "address_id",
      });
    }
  }
  Address.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(), // Use a function to generate a new UUID
        allowNull: false,
        primaryKey: true,
      },
      user_id: DataTypes.STRING,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      postal_code: DataTypes.STRING,
      province: DataTypes.STRING,
      country: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Address",
    }
  );
  return Address;
};
