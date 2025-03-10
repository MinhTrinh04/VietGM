const  Product  = require("../../models/VGM/Product");

const productService = {
  // Create
  create: async (productData) => {
    try {
      const product = new Product(productData);
      return await product.save();
    } catch (error) {
      throw error;
    }
  },

  // Read all with filters
  getAll: async (filters = {}) => {
    try {
      let query = Product.find()
        .populate("categoryId", "name")
        .sort({ createdAt: -1 });

      if (filters.isActive !== null && filters.isActive !== undefined) {
        query = query.where("isActive", filters.isActive);
      }

      if (filters.categoryId)
        query = query.where("categoryId", filters.categoryId);
      if (filters.minPrice) query = query.where("price").gte(filters.minPrice);
      if (filters.maxPrice) query = query.where("price").lte(filters.maxPrice);
      if (filters.rating) query = query.where("rating").gte(filters.rating);
      if (filters.isPopular) query = query.where("isPopular", true);
      if (filters.isBestSeller) query = query.where("isBestSeller", true);

      return await query.exec();
    } catch (error) {
      throw error;
    }
  },

  // Read one by ID
  getById: async (id) => {
    try {
      return await Product.findById(id).populate("categoryId", "name");
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      throw error;
    }
  },
  

  // Get by slug
  getBySlug: async (slug) => {
    try {
      return await Product.findOne({ slug }).populate(
        "categoryId",
        "name"
      );
    } catch (error) {
      throw error;
    }
  },

  // Update
  update: async (id, updateData) => {
    try {
      return await Product.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true
      }).populate("categoryId", "name");
    } catch (error) {
      throw error;
    }
  },

  // Delete
  delete: async (id) => {
    try {
      return await Product.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  },

  // Search products
  search: async (keyword) => {
    try {
      return await Product.find(
        { $text: { $search: keyword } },
        { score: { $meta: "textScore" } }
      )
        .sort({ score: { $meta: "textScore" } })
        .populate("categoryId", "name");
    } catch (error) {
      throw error;
    }
  },

  // Increment views và xử lý isPopular
  incrementViews: async (id) => {
    try {
      const product = await Product.findById(id);
      if (!product) return null;

      product.views += 1;
      if (product.views >= 1000 && product.rating >= 4) {
        product.isPopular = true;
      }

      return await product.save();
    } catch (error) {
      throw error;
    }
  },

  // Increment orderCount và xử lý isBestSeller
  incrementOrderCount: async (id, quantity = 1) => {
    try {
      const product = await Product.findById(id);
      if (!product) return null;

      product.orderCount += quantity;

      // Cập nhật isBestSeller nếu đủ điều kiện
      if (product.orderCount >= 100) {
        product.isBestSeller = true;
      }

      return await product.save();
    } catch (error) {
      debug("Increment order count error:", error);
      throw error;
    }
  },
};

module.exports = productService;
