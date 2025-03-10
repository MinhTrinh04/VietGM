const jwt = require('jsonwebtoken');
const User = require('../../models/VGM/User');

const authMiddleware = {
  // Middleware kiểm tra token và user
  protect: async (req, res, next) => {
    try {
      // Kiểm tra token trong header
      const token = req.headers.authorization?.split(' ')[1];
      // if (!token) {
      //   return res.status(401).json({ message: 'Không có quyền truy cập' });
      // }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Kiểm tra user có tồn tại và active
      const user = await User.findById(decoded.id).select('-password');
      if (!user || !user.isActive) {
        return res.status(401).json({ message: 'Tài khoản không tồn tại hoặc đã bị khóa' });
      }

      // Gán user vào request
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
    }
  },

  // Middleware kiểm tra role admin
  admin: (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Chỉ admin mới có quyền truy cập' });
    }
  },

  // Middleware kiểm tra role staff hoặc admin
  staffOrAdmin: (req, res, next) => {
    // if (req.user && (req.user.role === 'staff' || req.user.role === 'admin')) {
      next();
    // } else {
    //   res.status(403).json({ message: 'Không có quyền truy cập' });
    // }
  }
};

module.exports = authMiddleware;