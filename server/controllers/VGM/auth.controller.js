const authService = require('../../services/VGM/auth.service');

const authController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ 
          message: 'Email và mật khẩu không được để trống' 
        });
      }

      const result = await authService.login(email, password);
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = authController;