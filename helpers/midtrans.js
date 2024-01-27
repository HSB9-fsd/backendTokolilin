const Midtrans = require("midtrans-client");

const snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.PUBLIC_SECRET,
  clientKey: process.env.PUBLIC_CLIENT,
});

module.exports = snap;
