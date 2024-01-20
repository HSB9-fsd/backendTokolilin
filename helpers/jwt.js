const jwt = require("jsonwebtoken");

const secretKey = process.env.SECRET_KEY;
// const secretKey = "asldkjasdhalkd3879KHIasah";

const createAccessToken = (payload) => jwt.sign(payload, secretKey);

const verifyAccessToken = (access_token) => jwt.verify(access_token, secretKey);

module.exports = {
  createAccessToken,
  verifyAccessToken,
};
