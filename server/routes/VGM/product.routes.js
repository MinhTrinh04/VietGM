const express = require('express');
const router = express.Router();
const productController = require('../../controllers/VGM/product.controller');
const { protect,admin } = require('../../middleware/VGM/auth.middleware');
const uploadMiddleware = require('../../middleware/VGM/upload.middleware');

router.get('/search', productController.searchProducts);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get('/slug/:slug', productController.getProductBySlug);

router.use(protect, admin);

router.post('/', uploadMiddleware('product'), productController.createProduct);
router.put('/:id', uploadMiddleware('product'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;