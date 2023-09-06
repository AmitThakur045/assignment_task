const express = require("express");
const { fetchChat } = require("../controllers/chat.controller");

const router = express.Router();

router.post("/fetchchat", fetchChat);

module.exports = router;
