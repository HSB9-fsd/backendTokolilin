const snap = require("../../helpers/midtrans");
const {
  Address,
  Shipping,
  Product,
  Chackout_item,
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

  static async readShippingByUserId(req, res, next) {
    try {
      const userId = req.params.id;

      const shippings = await Shipping.findAll({
        where: {
          user_id: userId,
        },
      });

      const newDataPromises = shippings.map(async (shipping) => {
        const checkData = await Chackout_item.findAll({
          where: {
            shipping_id: shipping.id,
          },
        });

        const checkoutItemsWithProduct = await Promise.all(
          checkData.map(async (checkoutItem) => {
            const product = await Product.findByPk(checkoutItem.product_id);

            return {
              id: checkoutItem.id,
              product_id: {
                id: product.id,
                title: product.title,
                price: product.price,
                quantity: product.quantity,
                photo: product.photo,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
              },
              quantity: checkoutItem.quantity,
            };
          })
        );

        const address = await Address.findByPk(shipping.address_id);

        const shippingWithAddress = {
          id: shipping.id,
          user_id: shipping.user_id,
          address_id: {
            id: address.id,
            address: address.address,
            postal_code: address.postal_code,
            city: address.city,
            country: address.country,
          },
          payment: shipping.payment,
        };

        return {
          shipping: shippingWithAddress,
          checkoutItems: checkoutItemsWithProduct,
        };
      });

      const newData = await Promise.all(newDataPromises);

      const shippingArray = newData.map((data) => data.shipping);
      const checkoutArray = newData.reduce(
        (acc, data) => acc.concat(data.checkoutItems),
        []
      );

      const lastResult = {
        shipping: shippingArray,
        checkout: checkoutArray,
      };
      res.status(200).json(lastResult);
    } catch (error) {
      next(error);
    }
  }

  static async createShipping(req, res, next) {
    try {
      const {address_id, user_id, payment} = req.body;

      const products_datas = req.body.products_datas || [];
      let tokens = [];
      let totalGrossAmount = 0;
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
          body.user_id = user_id;
        }
      }

      const createdShipping = await Shipping.create(body);
      if (createdShipping.id) {
        let itemDetails = [];
        let quantities = req.body.quantity || [];
        for (let i = 0; i < products_datas.length; i++) {
          const item = products_datas[i];
          const productInfo = await Product.findOne({
            where: {
              id: item,
            },
          });

          if (productInfo) {
            const itemQuantity = quantities[i] || 1;
            await Chackout_item.create({
              id: crypto.randomUUID(),
              shipping_id: createdShipping.id,
              product_id: item,
              quantity: itemQuantity,
            });

            let itemDetail = {
              name: productInfo.title,
              price: productInfo.price,
              quantity: itemQuantity,
            };

            itemDetails.push(itemDetail);
            totalGrossAmount += productInfo.price * itemQuantity;
          }
        }

        let parameters = {
          item_details: itemDetails,
          transaction_details: {
            order_id: crypto.randomUUID(),
            gross_amount: totalGrossAmount,
          },
        };

        const token = await snap.createTransactionToken(parameters);
        tokens.push(token);
      }
      res.status(201).json({
        message: "Data Shipping Berhasil Dibuat",
        createdShipping,
        tokens: tokens[0],
      });
    } catch (error) {
      console.error(error.message);
      next(error);
    }
  }

  static async updateShippingById(req, res, next) {
    try {
      const {id} = req.params;
      const {payment} = req.body;

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
      const {id} = req.params;

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
