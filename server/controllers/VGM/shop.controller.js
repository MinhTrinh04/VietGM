const shopService = require("../../services/VGM/shop.service");

async function getShop(req, res) {
  try {
    const shopData = await shopService.convertToShopFormat();
    res.json(shopData);
  } catch (error) {
    console.error("Error fetching shop data:", error);
    res.status(500).json({ message: "Error fetching shop data" });
  }
}

module.exports = {
  getShop,
};
