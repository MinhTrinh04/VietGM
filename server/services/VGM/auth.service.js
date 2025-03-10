const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/VGM/User');

const authService = {
  login: async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('Tài khoản không tồn tại hoặc đã bị xóa');
    }

    if (!user.isActive) {
      throw new Error('Tài khoản đã bị khóa');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error('Email hoặc mật khẩu không đúng');
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      isActive: user.isActive,
      accessToken
    };
  }
};

module.exports = authService;