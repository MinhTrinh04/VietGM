const comboService = require("../../services/VGM/combo.service");
const debug = require("debug")("app:combo-controller");

const comboController = {
  // Create
  create: async (req, res) => {
    try {
      const combo = await comboService.create(req.body);
      res.status(201).json(combo);
    } catch (error) {
      debug("Create combo error:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Read all
  getAll: async (req, res) => {
    try {
      const combos = await comboService.getAll();
      res.json(combos);
    } catch (error) {
      debug("Get all combos error:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Read one
  getById: async (req, res) => {
    try {
      const combo = await comboService.getById(req.params.id);
      if (!combo) {
        return res.status(404).json({ message: "Không tìm thấy combo" });
      }
      res.json(combo);
    } catch (error) {
      debug("Get combo error:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get by slug
  getBySlug: async (req, res) => {
    try {
      const combo = await comboService.getBySlug(req.params.slug);
      if (!combo) {
        return res.status(404).json({ message: "Không tìm thấy combo" });
      }
      res.json(combo);
    } catch (error) {
      debug("Get combo by slug error:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Update
  update: async (req, res) => {
    try {
      const combo = await comboService.update(req.params.id, req.body);
      if (!combo) {
        return res.status(404).json({ message: "Không tìm thấy combo" });
      }
      res.json(combo);
    } catch (error) {
      debug("Update combo error:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Delete
  delete: async (req, res) => {
    try {
      const combo = await comboService.delete(req.params.id);
      if (!combo) {
        return res.status(404).json({ message: "Không tìm thấy combo" });
      }
      res.json({ message: "Xóa combo thành công" });
    } catch (error) {
      debug("Delete combo error:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Search
  search: async (req, res) => {
    try {
      const combos = await comboService.search(req.query.q);
      res.json(combos);
    } catch (error) {
      debug("Search combos error:", error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = comboController;
