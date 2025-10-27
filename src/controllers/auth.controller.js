const passport = require('passport');
const { generateToken } = require('../utils/jwt.utils');
const User = require('../models/User');

// Registro
async function register(req, res) {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    if (!first_name || !last_name || !email || !password) return res.status(400).json({ error: 'Faltan datos' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: 'Email ya registrado' });

    const newUser = new User({ first_name, last_name, email, age, password });
    await newUser.save();
    res.status(201).json({ message: 'Usuario creado', user: newUser.toJSON() });
  } catch (err) {
    res.status(500).json({ error: 'Error en registro' });
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

// Current
function current(req, res) {
  if (!req.user) return res.status(401).json({ error: 'Token inválido o no provisto' });
  res.json({ user: req.user });
}

module.exports = { register, login, current };
