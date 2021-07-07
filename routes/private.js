const express = require("express");
const { getPrivateData, addPassword, getAppNames, getPassword } = require("../controllers/private");
const { protect } = require("../middlewares/auth");
const router = express.Router();

router.route("/").get(protect, getPrivateData);

router.route("/addpassword/:id").post(protect, addPassword);

router.route("/getappnames/:id").get(protect, getAppNames);

router.route("/getpassword/:id").get(protect, getPassword);

module.exports = router;