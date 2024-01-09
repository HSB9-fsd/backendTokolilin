const { User, Product } = require("../../models/index");
const { Op } = require("sequelize");

class product {
  // GET ALL
  static async getAllProduct(req, res, next) {
    try {
      const { startPrice, endPrice, search, page, limit } = req.query;

      let pagination = {
        limit: limit ? limit : 6,
        order: [["createdAt", "DESC"]],
        where: {},
      };

      if (page && limit) {
        pagination.offset = (page - 1) * limit;
      }

      if (search) {
        pagination.where.title = {
          [Op.iLike]: `%${search}%`,
        };
      }

      let dataProduct = await Product.findAndCountAll(pagination);

      let totalPage = Math.ceil(dataProduct.count / (limit ? limit : 6));

      // SUKSES
      res.status(200).json({
        message: "Berhasil Mendapatkan Semua Data Produk",
        data: dataProduct.rows,
        totaldataProduct: dataProduct.count,
        totalPage: totalPage,
      });
    } catch (error) {
      next(error)
    }
  }

  // GET ONE
  static async getOneProduct(req, res, next) {
    try {
      const { id } = req.params;

      const dataProduct = await Product.findOne({
        where: {
          id,
        },
      });

      if (!dataProduct) {
        throw { name: "Id Product Tidak Ditemukan" };
      }
      res.status(200).json({
        message: "Berhasil Menampilkan Data Product By Id",
        dataProduct,
      });
    } catch (error) {
      next(error)
    }
  }

  // CREATE
  static async createProduct(req, res, next) {
    try {
      const { title, price, quantity, photo } = req.body;

      const data = await Product.create({
        title,
        price,
        quantity,
        photo,
      });

      res.status(201).json({
        message: "Berhasil Menambahkan Data Product",
        data,
      });
    } catch (error) {
      next(error)
    }
  }

  // UPDATE
  static async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { title, price, quantity, photo } = req.body;

      const data = await Product.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { name: "Id Product Tidak Ditemukan" };
      }

      await Product.update(
        {
          title,
          price,
          quantity,
          photo,
        },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        message: "Berhasil Memperbaharui Data Product",
      });
    } catch (error) {
      next(error)
    }
  }

  // DELETE
  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;

      const data = await Product.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { name: "Id Product Tidak Ditemukan" };
      }

      await Product.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: "Berhasil Menghapus Data Product",
      });
    } catch (error) {
      next(error)
    }
  }
}

module.exports = product;
