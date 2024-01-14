const handleError = (err, req, res, next) => {
  console.log(err);
  let code = 500;
  let message = "Internal Server Error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name == "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = [];
    err.errors.forEach((el) => {
      message.push(el.message);
    });

    //401
  } else if (err.name === "Not Login") {
    code = 401;
    message = "Akses Token Tidak Ada";
  }

  // 400
  else if (err.name === "Invalid Email/Password") {
    code = 400;
    message = "Invalid Email/Password";
  } else if (err.name === "Quantity Tidak Cukup") {
    code = 400;
    message = `Quantity Tidak Cukup, karena sisa ${err.sisa}`;
  }

  // 404
  else if (err.name === "Id Product Tidak Ditemukan") {
    code = 404;
    message = "Id Product Tidak Ditemukan";
  } else if (err.name === "Id User Tidak Ditemukan") {
    code = 404;
    message = "Id User Tidak Ditemukan";
  } else if (err.name === "Data Address Tidak Ditemukan") {
    code = 404;
    message = "Data Address Tidak Ditemukan";
  } else if (err.name === "user_id Tidak Ditemukan") {
    code = 404;
    message = "user_id Tidak Ditemukan";
  } else if (err.name === "cart_id Tidak Ditemukan") {
    code = 404;
    message = "cart_id Tidak Ditemukan";
  } else if (err.name === "id Address Tidak Ditemukan") {
    code = 404;
    message = "id Address Tidak Ditemukan";
  } else if (err.name === "id Cart Tidak Ditemukan") {
    code = 404;
    message = "id Cart Tidak Ditemukan";
  } else if (err.name === "id Cart_item Tidak Ditemukan") {
    code = 404;
    message = "id Cart_item Tidak Ditemukan";
  } else if (err.name === "id User Tidak Ditemukan") {
    code = 404;
    message = "id User Tidak Ditemukan";
  } else if (err.name === "Id Address Tidak Ditemukan") {
    code = 404;
    message = "Id Address Tidak Ditemukan";
  }

  // 401 dan 403
  else if (err.name === "JsonWebTokenError") {
    code = 401;
    message = "Token Tidak Sesuai";
  }
  res.status(code).json({
    statusCode: code,
    message: message,
  });
};

module.exports = handleError;
