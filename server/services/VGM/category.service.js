const Category = require("../../models/VGM/Category");
const debug = require("debug")("app:category-service");


console.log("Category model:", Category);
const categoryService = {
  // Create
  create: async (categoryData) => {
    try {
      const category = new Category(categoryData);
      return await category.save();
    } catch (error) {
      debug("Create category error:", error);
      throw error;
    }
  },

  // Read all
  getAll: async () => {
    try {
      return await Category.find().sort({ createdAt: -1 });
    } catch (error) {
      debug("Get all categories error:", error);
      throw error;
    }
  },

  // Read one by ID
  getById: async (id) => {
    try {
      return await Category.findById(id);
    } catch (error) {
      debug("Get category by ID error:", error);
      throw error;
    }
  },

  // Update
  update: async (id, updateData) => {
    try {
      return await Category.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      debug("Update category error:", error);
      throw error;
    }
  },

  // Delete
  delete: async (id) => {
    try {
      return await Category.findByIdAndDelete(id);
    } catch (error) {
      debug("Delete category error:", error);
      throw error;
    }
  },
};

module.exports = categoryService;
