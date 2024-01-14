"use strict";
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Cart_items", {
      id: {
        allowNull: false,
        unique: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
      },
      cart_id: {
        type: Sequelize.UUID,
        references: {
          model: "Carts",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      shipping_id: {
        type: Sequelize.UUID,
        references: {
          model: "Shippings",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      product_id: {
        type: Sequelize.UUID,
        references: {
          model: "Products",
          key: "id",
        },
        onDelete: "cascade",
        onUpdate: "cascade",
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      checkout: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Cart_items");
  },
};
