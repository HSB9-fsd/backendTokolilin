const {User, Address} = require("../../models/index");
const {comparePassword, hashingPassword} = require("../../helpers/bcrypt");
const {createAccessToken} = require("../../helpers/jwt");
const remove = require("../../helpers/multerRemove");

class user {
  static async register(req, res, next) {
    try {
      const {email, password, first_name, last_name, phone, avatar} = req.body;
      // console.log(req.body);

      const {filename} = req.file;
      const newFile =
        req.protocol + "://" + req.get("host") + "/avatar/" + filename;

      const data = await User.create({
        email,
        password,
        first_name,
        last_name,
        phone,
        // avatar: req.file ? req.file.path : "",
        avatar: newFile,
      });

      await Address.create({
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
      const {email, password} = req.body;
      let data = await User.findOne({
        where: {
          email,
        },
      });
      if (!email) {
        throw {name: "Invalid Email/Password"};
      }
      if (!password) {
        throw {name: "Invalid Email/Password"};
      }
      if (!data) {
        throw {name: "Not Login"};
      }
      const isData = comparePassword(password, data.password);
      // console.log(isData);
      if (!isData) {
        throw {name: "Invalid Email/Password"};
      }
      const payload = {
        id: data.id,
      };
      const token = createAccessToken(payload);
      if (!token) {
        throw {name: "JsonWebTokenError"};
      }

      res.status(200).json({
        message: "User Berhasil Login",
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
      const {id} = req.User;

      const data = await User.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw {name: "Id User Tidak Ditemukan"};
      }
      res.status(200).json({
        message: "Berhasil Menampilkan Data User By Id",
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const {id} = req.params;
      const {first_name, last_name, phone, avatar} = req.body;

      const data = await User.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw {name: "Id User Tidak Ditemukan"};
      }

      let body = {first_name, last_name, phone, avatar};

      if (req.file) {
        remove(data.avatar);

        const {filename} = req.file;
        const newFile =
          req.protocol + "://" + req.get("host") + "/avatar/" + filename;
        body.avatar = newFile;
      }

      await User.update(body, {
        where: {
          id,
        },
      });

      res.status(200).json({
        message: "Berhasil Memperbaharui Data User",
      });
    } catch (error) {
      next(error);
    }
  }

  static async updatePassword(req, res, next) {
    try {
      const {id} = req.params;
      const {oldPassword, newPassword, confirmPassword} = req.body;
      // console.log(req.body);
      const data = await User.findOne({
        where: {
          id,
        },
      });

      if (!data) {
        throw {name: "Id User Tidak Ditemukan"};
      }

      const lastPassword = comparePassword(oldPassword, data.password);

      if (!lastPassword) {
        throw {name: "Invalid Password"};
      }

      if (newPassword !== confirmPassword) {
        throw {name: "Password Not Match"};
      }

      const hashNewPassword = hashingPassword(newPassword);

      let body = {password: hashNewPassword};

      await User.update(body, {
        where: {
          id,
        },
      });

      res.status(200).json({
        message: "Berhasil Memperbaharui Password",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = user;
