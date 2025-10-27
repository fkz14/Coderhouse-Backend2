const User = require('../models/User');

// Listar todos los usuarios
async function getAll(req, res) {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error al listar usuarios' });
  }
}

// Traer usuario por ID
async function getById(req, res) {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar usuario' });
  }
}

// Actualizar usuario
async function updateUser(req, res) {
  try {
    const { first_name, last_name, email, age, password, role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    if (first_name) user.first_name = first_name;
    if (last_name) user.last_name = last_name;
    if (email) user.email = email;
    if (age) user.age = age;
    if (role) user.role = role;
    if (password) user.password = password; // se encripta por pre-save

    await user.save();
    res.json({ message: 'Usuario actualizado', user: user.toJSON() });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
}

// Eliminar usuario
async function deleteUser(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
}

module.exports = { getAll, getById, updateUser, deleteUser };
