const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/VGM/category.controller');
const { protect, admin } = require('../../middleware/VGM/auth.middleware');

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

router.use(protect, admin);
router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
