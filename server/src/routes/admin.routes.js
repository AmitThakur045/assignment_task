const express = require("express");
const { adminLogin, adminSignup } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/login", adminLogin);
router.post("/signup", adminSignup);

module.exports = router;
