const multer = require("multer");
const fs = require("fs");

const upload = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      fs.mkdirSync(`upload/${file.fieldname}/`, { recursive: true });
      if (file.fieldname === "avatar") {
        cb(null, `./upload/avatar/`);
      } else if (file.fieldname === "photo") {
        cb(null, `./upload/photo/`);
      }
    },
    filename: function (req, file, cb) {
      const tanggal = new Date().getTime().toString();
      cb(null, `${tanggal}${file.originalname}`);
    },
  });

  const uploadImg = multer({ storage: storage });

  return uploadImg;
};

module.exports = upload;
