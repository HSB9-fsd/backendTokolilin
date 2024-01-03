const { Products } = require("../../models/index");
// const { comparePassword } = require("../../helpers/bcrypt");
// const { createAccessToken } = require("../../helpers/jwt");



class products {
    async addProduct(req, res) {
        try {
            const { title, price, quantity, photo } = req.body;
            if (!title) {
                throw { code: 400, message: "Title is required" };
            }
            if (!price) {
                throw { code: 400, message: "Price is required" };
            }
            if (!quantity) {
                throw { code: 400, message: "Quantity is required" };
            }
            if (photo) {
                throw { code: 400, message: "Image must be JPEG, PNG, or WEBP" };
            }

            const data = await Products.create({
                title,
                price,
                quantity,
                photo,
            });
            if (!data) {
                throw { code: 500, message: "Product cannot be saved" };
            }
            // console.log(req.body);
            return res.status(200).json({
                status: true,
                message: "Product saved successfully",
                data,
            });
        } catch (error) {
            return res.status(error.code || 500).json({
                status: false,
                message: error.message,
            });
        }
    }
}


module.exports = products;
