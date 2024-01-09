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
  } else if (err.name === "Not Login") {
    code = 401;
    message = "Akses Token Tidak Ada";
  }

  //
  else if (err.name === "Invalid Email/Password") {
    code = 400;
    message = "Invalid Email/Password";
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
  } else if (err.name === "id Address Tidak Ditemukan") {
    code = 404;
    message = "id Address Tidak Ditemukan";
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
