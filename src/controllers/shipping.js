const {
  User,
  Address,
  Cart,
  Shipping,
  Product,
  Shiping,
} = require("../../models/index");

class address {
  static async readAllShipping(req, res, next) {
    try {
      let data = await Shipping.findAll();
      if (!data) {
        throw {
          name: "Data Shipping Tidak Ditemukan",
        };
      }
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async createShipping(req, res, next) {
    try {
      const { address_id, payment } = req.body;

      console.log(req.body);

      let body = {
        payment,
      };

      if (address_id) {
        let dataAddress = await Address.findOne({
          where: {
            id: address_id,
          },
        });
        if (!dataAddress) {
          throw {
            name: "Id Address Tidak Ditemukan",
          };
        } else {
          body.address_id = address_id;
        }
      }

      const data = await Shipping.create(body);

      res.status(201).json({
        message: "Data Shipping Berhasil Dibuat",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateShippingById(req, res, next) {
    try {
      const { id } = req.params;
      const { payment } = req.body;

      await Shipping.update(
        {
          payment,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        message: "Berhasil Memperbaharui Data Shipping",
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteShippingById(req, res, next) {
    try {
      const { id } = req.params;

      const dataShipping = await Shipping.findOne({
        where: {
          id,
        },
      });

      if (!dataShipping) {
        throw {
          name: "id Shipping Tidak Ditemukan",
        };
      }
      await Shipping.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: "Berhasil Menghapus Data Shipping",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = address;
