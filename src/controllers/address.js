const {User, Address} = require("../../models/index");

class address {
  static async createAddress(req, res, next) {
    try {
      const {id, address, city, postal_code, province, country} = req.body;
      console.log("address", id);
      let dataUser = await User.findOne({
        where: {
          id,
        },
      });
      if (!dataUser) {
        throw {
          name: "Id User Tidak Ditemukan",
        };
      }
      const data = await Address.create({
        user_id: id,
        address,
        city,
        postal_code,
        province,
        country,
      });
      res.status(201).json({
        message: "Data Address Berhasil Dibuat",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async readAllAddress(req, res, next) {
    try {
      let data = await Address.findAll();
      if (!data) {
        throw {
          name: "Data Address Tidak Ditemukan",
        };
      }
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async readAddressByUserId(req, res, next) {
    try {
      const userId = req.params.id;

      // if (userId) {
      //   return res.json("Data Cart Tidak Ditemukan");
      // }

      const address = await Address.findOne({
        where: {
          user_id: userId,
        },
      });

      res.status(200).json(address);
    } catch (error) {
      console.error(error.message);
      next(error);
    }
  }

  static async updateAddressById(req, res, next) {
    try {
      const {id} = req.params;
      const {address, city, postal_code, province, country, user_id} = req.body;

      if (user_id == "") {
        throw {name: "user_id Tidak Ditemukan"};
      }
      const dataAddress = await Address.findOne({
        where: {
          id,
        },
        include: [
          {
            model: User,
          },
        ],
      });

      if (!dataAddress) {
        throw {
          name: "id Address Tidak Ditemukan",
        };
      }
      await Address.update(
        {
          address,
          city,
          postal_code,
          province,
          country,
        },
        {
          where: {
            id,
          },
        }
      );

      //   const data = await Address.findOne({
      //     id,
      //   })
      res.status(200).json({
        message: "Berhasil Memperbaharui Data Address",
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateAddressByIdAddress(req, res, next) {
    try {
      const {id} = req.params;

      // if (!id) {
      //   return res.json("Error Id");
      // }

      const addressData = await Address.findByPk(id);

      if (!addressData) {
        return res.json("Error Address");
      }

      const {address, city, postal_code, province, country} = req.body;

      await Address.update(
        {
          address,
          city,
          postal_code,
          province,
          country,
        },
        {
          where: {
            id: id,
          },
        }
      );

      res.status(200).json({
        message: "Berhasil Memperbaharui Data Address",
        addressData,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async deleteAddressById(req, res, next) {
    try {
      const {id} = req.params;

      const dataAddress = await Address.findOne({
        where: {
          id,
        },
      });

      if (!dataAddress) {
        throw {
          name: "id Address Tidak Ditemukan",
        };
      }
      await Address.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: "Berhasil Menghapus Data Address",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = address;
