const express = require("express");
const user = require("../controllers/user");
const authentication = require("../../middlewares/autentication");
const upload = require("../../helpers/multer");
const avatar = upload();

const router = express.Router();

router.get("/profile", authentication, user.getOneUser);
router.get("/", authentication, user.getAllUser);
router.post("/register", avatar.single("avatar"), user.register);
router.post("/login", user.login);
router.patch("/password/:id", authentication, user.updatePassword);
router.patch("/:id", authentication, avatar.single("avatar"), user.updateUser);

module.exports = router;
