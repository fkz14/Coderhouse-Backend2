const User = require('../../models/User');

class UserDAO {
  async findAll() {
    try {
      return await User.find().select('-password');
    } catch (err) {
      throw new Error('Error al obtener todos los usuarios: ' + err.message);
    }
  }

  async findById(id) {
    try {
      return await User.findById(id).select('-password');
    } catch (err) {
      throw new Error('Error al obtener usuario por ID: ' + err.message);
    }
  }

  async findByEmail(email) {
    try {
      return await User.findOne({ email: email.toLowerCase() });
    } catch (err) {
      throw new Error('Error al obtener usuario por email: ' + err.message);
    }
  }

  async create(userData) {
    try {
      const newUser = new User(userData);
      return await newUser.save();
    } catch (err) {
      throw new Error('Error al crear usuario: ' + err.message);
    }
  }

  async update(id, userData) {
    try {
      return await User.findByIdAndUpdate(id, userData, { new: true }).select('-password');
    } catch (err) {
      throw new Error('Error al actualizar usuario: ' + err.message);
    }
  }

  async delete(id) {
    try {
      return await User.findByIdAndDelete(id);
    } catch (err) {
      throw new Error('Error al eliminar usuario: ' + err.message);
    }
  }
}

module.exports = new UserDAO();
