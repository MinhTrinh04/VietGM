const Product = require("../../models/VGM/Product");
const Category = require("../../models/VGM/Category");
const debug = require("debug")("app:shop");

async function convertToShopFormat() {
  try {
    debug("Starting to process shop data");

    const categories = await Category.find();
    const products = await Product.find({ isActive: true });

    const shopData = {
      collection: {
        popular: [],
        bestseller: []
      },
      categories: [],
      items: [],
      appetizer: [],
      maindish: [],
      dessert: [],
      drinks: [],
      set_combo: []
    };

    const categoriesMap = {};
    categories.forEach((category) => {
      categoriesMap[category._id] = category.slug;
    });

    products.forEach((product) => {
      const item = {
        id: product._id,
        image: product.image,
        title: product.title,
        price: `${product.price}`,
        currency: product.currency || "VNĐ",
        rating: product.rating || 5,
        text: product.description,
        badge: product.badge || ""
      };

      shopData.items.push(item);

      if (product.isPopular) {
        shopData.collection.popular.push(item);
      }

      if (product.isBestSeller) {
        shopData.collection.bestseller.push(item);
      }

      const categorySlug = categoriesMap[product.categoryId];
      if (categorySlug) {
        switch (categorySlug) {
          case "mon-khai-vi":
            shopData.appetizer.push(item);
            break;
          case "mon-chinh":
            shopData.maindish.push(item);
            break;
          case "mon-trang-mieng":
            shopData.dessert.push(item);
            break;
          case "do-uong":
            shopData.drinks.push(item);
            break;
          case "set-combo":
            shopData.set_combo.push(item);
            break;
          default:
            break;
        }
      }
    });

    return shopData;
  } catch (error) {
    debug("Error in converting shop data:", error);
    throw error;
  }
}

module.exports = {
  convertToShopFormat,
};

