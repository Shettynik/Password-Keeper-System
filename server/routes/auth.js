const express = require("express");
const { login, register, forgotpassword, resetpassword } = require("../controllers/auth");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgotpassword").post(forgotpassword);
router.route("/passwordreset/:resetToken").put(resetpassword);

module.exports = router;