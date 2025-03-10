const express = require("express");
const router = express.Router();
const menuController = require("../../controllers/VGM/menu.controller");

router.get("/", menuController.getMenu);

module.exports = router;
