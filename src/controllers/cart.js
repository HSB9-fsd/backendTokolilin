const {User, Address, Cart} = require("../../models/index");

class cart {
  static async createCart(req, res, next) {
    try {
      const {user_id, product_id} = req.body;
      // console.log(req.body);
      let dataUser = await User.findOne({
        where: {
          id: user_id,
        },
      });
      if (!dataUser) {
        throw {
          name: "Id User Tidak Ditemukan",
        };
      }
      const data = await Cart.create({
        user_id,
        product_id,
      });
      res.status(201).json({
        message: "Data Cart Berhasil Dibuat",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async readAllCart(req, res, next) {
    try {
      let data = await Cart.findAll();
      if (!data) {
        throw {
          name: "Data Cart Tidak Ditemukan",
        };
      }
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async deleteCartById(req, res, next) {
    try {
      const {id} = req.params;

      const dataCart = await Cart.findOne({
        where: {
          id,
        },
      });

      if (!dataCart) {
        throw {
          name: "id Cart Tidak Ditemukan",
        };
      }
      await Cart.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: "Berhasil Menghapus Data Cart",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = cart;
