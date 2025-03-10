const productService = require("../../services/VGM/product.service");

const productController = {
  createProduct: async (req, res) => {
    try {
      const productData = {
        ...req.body,
        isActive: req.body.isActive === "true",
      };
      const product = await productService.create(productData);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const filters = {
        categoryId: req.query.categoryId,
        minPrice: req.query.minPrice,
        maxPrice: req.query.maxPrice,
        rating: req.query.rating,
        isPopular: req.query.isPopular,
        isBestSeller: req.query.isBestSeller,
        isActive: req.query.isActive,
      };
      const products = await productService.getAll(filters);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProductById: async (req, res) => {
    try {
      const product = await productService.getById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get by slug
  getProductBySlug: async (req, res) => {
    try {
      const product = await productService.getBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const updateData = {
        ...req.body,
        isActive: req.body.isActive === "true",
      };
      const product = await productService.update(req.params.id, updateData);
      if (!product) {
        return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product = await productService.delete(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      }
      res.json({ message: "Xóa sản phẩm thành công" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  searchProducts: async (req, res) => {
    try {
      const products = await productService.search(req.query.keyword);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = productController;
