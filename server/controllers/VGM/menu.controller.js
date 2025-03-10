const menuService = require("../../services/VGM/menu.service");

async function getMenu(req, res) {
  try {
    const menu = await menuService.convertToMenuFormat();
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: "Error generating menu", error });
  }
}

module.exports = {
  getMenu,
};
