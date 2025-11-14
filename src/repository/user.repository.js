const userDAO = require('../dao/models/user.dao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserRepository {
  // Registro de usuario
  async register(userData) {
    try {
      const { email } = userData;
      
      // Validar email único
      const existingUser = await userDAO.findByEmail(email);
      if (existingUser) {
        throw new Error('Email ya registrado');
      }

      // Crear usuario (el password se hashea en el modelo)
      const newUser = await userDAO.create(userData);
      return newUser;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Login
  async login(email, password) {
    try {
      const user = await userDAO.findByEmail(email);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      const isValidPassword = user.isValidPassword(password);
      if (!isValidPassword) {
        throw new Error('Contraseña incorrecta');
      }

      return user;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Reset password - generar token
  async generateResetToken(email) {
    try {
      const user = await userDAO.findByEmail(email);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      const resetToken = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_RESET_SECRET,
        { expiresIn: process.env.RESET_TOKEN_EXPIRES || '1h' }
      );

      return { resetToken, userId: user._id };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Reset password - cambiar contraseña
  async resetPassword(token, newPassword) {
    try {
      // Validar que newPassword existe
      if (!newPassword) {
        throw new Error('Nueva contraseña requerida');
      }

      // Validar token
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);
      } catch (err) {
        if (err.name === 'TokenExpiredError') {
          throw new Error('Token expirado');
        }
        throw new Error('Token inválido');
      }

      // Obtener usuario por ID directamente
      const User = require('../models/User');
      const user = await User.findById(decoded.userId);

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      if (!user.password) {
        throw new Error('Usuario sin contraseña válida');
      }

      // Comparar con contraseña anterior
      if (user.isValidPassword(newPassword)) {
        throw new Error('La nueva contraseña no puede ser igual a la anterior');
      }

      // Actualizar contraseña (el pre-save hook la hasheará)
      user.password = newPassword;
      await user.save();

      return user;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Obtener todos los usuarios
  async getAllUsers() {
    try {
      return await userDAO.findAll();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Obtener usuario por ID
  async getUserById(id) {
    try {
      return await userDAO.findById(id);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Actualizar usuario
  async updateUser(id, userData) {
    try {
      // Si intenta actualizar email, verificar que sea único
      if (userData.email) {
        const existingUser = await userDAO.findByEmail(userData.email);
        if (existingUser && existingUser._id.toString() !== id) {
          throw new Error('Email ya registrado');
        }
      }

      return await userDAO.update(id, userData);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Eliminar usuario
  async deleteUser(id) {
    try {
      return await userDAO.delete(id);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = new UserRepository();
