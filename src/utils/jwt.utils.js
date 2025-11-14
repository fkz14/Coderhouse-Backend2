const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  try {
    if (!process.env.JWT_SECRET) throw new Error('JWT secret no configurada');
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });
  } catch (err) {
    throw new Error('Error generando token: ' + err.message);
  }
};

module.exports = { generateToken };
