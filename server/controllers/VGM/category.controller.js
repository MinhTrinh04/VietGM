const categoryService = require('../../services/VGM/category.service');

const categoryController = {
    // Create
    createCategory: async (req, res) => {
        try {
            const category = await categoryService.create(req.body);
            res.status(201).json(category);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Read all
    getAllCategories: async (req, res) => {
        try {
            const categories = await categoryService.getAll();
            res.json(categories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Read one
    getCategoryById: async (req, res) => {
        try {
            const category = await categoryService.getById(req.params.id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.json(category);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Update
    updateCategory: async (req, res) => {
        try {
            const category = await categoryService.update(req.params.id, req.body);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.json(category);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Delete
    deleteCategory: async (req, res) => {
        try {
            const category = await categoryService.delete(req.params.id);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.json({ message: 'Category deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = categoryController;
