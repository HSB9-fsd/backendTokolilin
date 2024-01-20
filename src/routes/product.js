const express = require("express");
const product = require("../controllers/product");
const authentication = require("../../middlewares/autentication");
const upload = require("../../helpers/multer");
const photo = upload();

const router = express.Router();

router.get("/", product.getAllProduct);
router.get("/:id", product.getOneProduct);
router.post("/", authentication, photo.single("photo"), product.createProduct);
router.patch(
  "/:id",
  authentication,
  photo.single("photo"),
  product.updateProduct
);
router.delete("/:id", authentication, product.deleteProduct);

module.exports = router;
