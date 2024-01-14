const {
  User,
  Address,
  Cart,
  Cart_item,
  Product,
} = require("../../models/index");

class address {
  static async createCartItem(req, res, next) {
    try {
      const { cart_id, product_id, quantity } = req.body;
      // console.log(req.body);

      let body = {
        quantity,
      };

      if (cart_id) {
        let dataCart = await Cart.findOne({
          where: {
            id: cart_id,
          },
        });
        if (!dataCart) {
          throw {
            name: "Id Cart Tidak Ditemukan",
          };
        } else {
          body.cart_id = cart_id;
        }
      }

      if (product_id) {
        let dataProduct = await Product.findOne({
          where: {
            id: product_id,
          },
        });

        if (!dataProduct) {
          throw {
            name: "Id Product Tidak Ditemukan",
          };
        } else {
          body.product_id = product_id;
        }
      }
      const data = await Cart_item.create(body);
      res.status(201).json({
        message: "Data Cart_item Berhasil Dibuat",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async readAllCartItem(req, res, next) {
    try {
      let data = await Cart_item.findAll();
      if (!data) {
        throw {
          name: "Data Cart_item Tidak Ditemukan",
        };
      }
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async updateCartItemById(req, res, next) {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      await Cart_item.update(
        {
          quantity,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        message: "Berhasil Memperbaharui Data Cart_item",
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCartItemById(req, res, next) {
    try {
      const { id } = req.params;

      const dataCartItem = await Cart_item.findOne({
        where: {
          id,
        },
      });

      if (!dataCartItem) {
        throw {
          name: "id Cart_item Tidak Ditemukan",
        };
      }
      await Cart_item.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: "Berhasil Menghapus Data Cart_item",
      });
    } catch (error) {
      next(error);
    }
  }

  static async checkoutCartItem(req, res, next) {
    try {
      const { id } = req.params;

      const data = await Cart_item.findOne({ where: { id } });

      if (!data) {
        throw { name: "Id Cart Item Tidak Ditemukan" };
      }

      let dataProduct = await Product.findOne({
        where: {
          id: data.product_id,
        },
      });

      if (dataProduct.quantity < data.quantity) {
        throw { name: `Quantity Tidak Cukup`, sisa: dataProduct.quantity };
      }

      await Cart_item.update(
        {
          checkout: true,
        },
        {
          where: {
            id,
          },
        }
      );

      let sisa = dataProduct.quantity - data.quantity;

      await Product.update(
        { quantity: sisa },
        { where: { id: data.product_id } }
      );

      res.status(200).json({
        message: "Berhasil Checkout Data Cart_item",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = address;
