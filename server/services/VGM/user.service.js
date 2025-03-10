const User = require('../../models/VGM/User');

const userService = {
  getAllUsers: async () => {
    return await User.find();
  },

  getUserById: async (id) => {
    return await User.findById(id);
  },

  createUser: async (userData) => {
    const newUser = new User(userData);
    return await newUser.save();
  },

  updateUser: async (id, userData) => {
    return await User.findByIdAndUpdate(id, userData, { new: true });
  },

  deleteUser: async (id) => {
    return await User.findByIdAndDelete(id);
  }
};

module.exports = userService;