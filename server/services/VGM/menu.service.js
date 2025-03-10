const Product = require("../../models/VGM/Product");
const Category = require("../../models/VGM/Category");
const slugify = require("slugify");
const debug = require("debug")("app:menu");

async function convertToMenuFormat() {
  try {
    debug("Starting to process menu");
    const categories = await Category.find();
    const products = await Product.find();

    const categoriesMap = {};

    categories.forEach((category) => {
      debug("Processing category:", category.name);
      categoriesMap[category._id] = {
        name: category.name,
        slug: category.slug,
        description: category.description,
        items: [],
      };
    });

    products.forEach((product) => {
      const item = {
        image: product.image,
        title: product.title,
        price: product.price,
        currency: product.currency || "VNĐ",
        rating: product.rating || 5,
        text: product.description,
        id: product._id,
      };

      if (categoriesMap[product.categoryId]) {
        categoriesMap[product.categoryId].items.push(item);
      }
    });

    return {
      categories: Object.values(categoriesMap),
    };
  } catch (error) {
    debug("Error in converting products:", error);
    throw error; // Propagate error to controller
  }
}

module.exports = {
  convertToMenuFormat,
};
