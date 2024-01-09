const { User } = require("../../models/index");
const { comparePassword } = require("../../helpers/bcrypt");
const { createAccessToken } = require("../../helpers/jwt");

class user {
  static async register(req, res, next) {
    try {
      const { email, password, first_name, last_name, phone, avatar } =
        req.body;
        // console.log(req.body);
      const data = await User.create({
        email,
        password,
        first_name,
        last_name,
        phone,
        avatar,
      });
      
      res.status(201).json({
        message: "Berhasil Register User Baru",
        data,
      });
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      let data = await User.findOne({
        where: {
          email,
        },
      });
      if (!data) {
        throw { name: "Not Login" };
      }
      const isData = comparePassword(password, data.password);
      // console.log(isData);
      if (!email) {
        throw { name: "Invalid Email/Password" };
      }
      if (!password) {
        throw { name: "Invalid Email/Password" };
      }
      if (!isData) {
        throw { name: "Invalid Email/Password" };
      }
      const payload = {
        id: data.id,
      };
      const token = createAccessToken(payload);
      if (!token) {
        throw { name: "JsonWebTokenError" };
      }
      res.status(200).json({
        message: "User Berhasil Login",
        access_token: token,
        name: data.first_name,
      });
    } catch (error) {
      next(error)
    }
  }
}

module.exports = user;
