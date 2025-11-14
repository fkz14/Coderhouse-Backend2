const passport = require('passport');
const { generateToken } = require('../utils/jwt.utils');
const userRepository = require('../repository/user.repository');
const UserDTO = require('../dto/user.dto');

// Registro
async function register(req, res) {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ error: 'Faltan datos' });
    }

    const user = await userRepository.register({ first_name, last_name, email, age, password });
    res.status(201).json({ message: 'Usuario creado', user: new UserDTO(user) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Login
function login(req, res, next) {
  passport.authenticate('login', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ error: info?.message || 'No autorizado' });

    const token = generateToken({ id: user._id, email: user.email, role: user.role });
    res.json({ message: 'Login correcto', token });
  })(req, res, next);
}

// Current - Devuelve usuario con DTO
function current(req, res) {
  if (!req.user) return res.status(401).json({ error: 'Token inválido o no provisto' });
  res.json({ user: new UserDTO(req.user) });
}

// Forgot Password - Generar token de recuperación
async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email requerido' });
    }

    const result = await userRepository.generateResetToken(email);
    res.json({
      message: 'Token de recuperación generado',
      resetToken: result.resetToken
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Reset Password - Cambiar contraseña
async function resetPassword(req, res) {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ error: 'Token y nueva contraseña requeridos' });
    }

    const user = await userRepository.resetPassword(token, newPassword);
    res.json({
      message: 'Contraseña actualizada correctamente',
      user: new UserDTO(user)
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { register, login, current, forgotPassword, resetPassword };
