const { User, Cart } = require("../../models/index");
const { comparePassword } = require("../../helpers/bcrypt");
const { createAccessToken } = require("../../helpers/jwt");

class user {
  static async register(req, res, next) {
    try {
      const { email, password, first_name, last_name, phone, avatar } = req.body;
      // console.log(req.body);

      const { filename } = req.file;
      const newFile = req.protocol + "://" + req.get("host") + "/avatar/" + filename;

      const data = await User.create({
        email,
        password,
        first_name,
        last_name,
        phone,
        avatar: newFile,
      });

      await Cart.create({
        user_id: data.id,
      });

      res.status(201).json({
        message: "Berhasil Register User Baru",
        data,
      });
    } catch (error) {
      next(error);
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
      if (!email) {
        throw { name: "Invalid Email/Password" };
      }
      if (!password) {
        throw { name: "Invalid Email/Password" };
      }
      if (!data) {
        throw { name: "Not Login" };
      }
      const isData = comparePassword(password, data.password);
      // console.log(isData);
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
        id: data.id,
        name: data.first_name,
        access_token: token,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async getAllUser(req, res, next) {
    try {
      const data = await User.findAll();

      res.status(200).json({
        message: "Berhasil Menampilkan Data User",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getOneUser(req, res, next) {
    try {
      const { id } = req.params;

      const data = await User.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw { name: "Id User Tidak Ditemukan" };
      }
      res.status(200).json({
        message: "Berhasil Menampilkan Data User By Id",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  // LOGOUT USER
  static async logout(req, res, next) {

  };

  // UPDATE USER
  static async updateUser(req, res, next) {

    try {
      const { email, password, first_name, last_name, phone, avatar } = req.body;
      const user = await User.findByPk(req.params.id);

      if (!user) {
        res.status(404).json("User not found");
        return;
      }

      avatar.single("file")(req, res, async (err) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }

        if (req.file) {
          const { filename } = req.file;

          let finalImageURL =
            req.protocol + "://" + req.get("host") + "/Images/" + filename;

          await User.update({ avatar: finalImageURL });
        }

        const { email, password, first_name, last_name, phone, avatar } = req.body;

        const newUser = await User.update({
          email, password, first_name, last_name, phone, avatar
        });

        res.status(200).json(newUser);
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

  }




  // DELETE USER
  static async deleteUserById(req, res, next) {

  }
}
module.exports = user;


