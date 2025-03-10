const express = require("express");
const router = express.Router();
const shopController = require("../../controllers/VGM/shop.controller");

router.get("/", shopController.getShop);

module.exports = router;
