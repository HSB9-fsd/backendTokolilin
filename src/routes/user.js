const express = require("express");
const user = require("../controllers/user");
const authentication = require("../../middlewares/autentication");
const upload = require("../../helpers/multer");
const avatar = upload();

const router = express.Router();

router.get("/", authentication, user.getAllUser);
router.get("/:id", authentication, user.getOneUser);
router.post("/register", avatar.single("avatar"), user.register);
router.post("/login", user.login);

module.exports = router;
