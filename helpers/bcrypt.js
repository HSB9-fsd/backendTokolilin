const bcrypt = require("bcryptjs");

const hashingPassword = (password) => bcrypt.hashSync(password);
const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);

module.exports = {
  hashingPassword,
  comparePassword,
};
