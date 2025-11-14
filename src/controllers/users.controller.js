const userRepository = require('../repository/user.repository');
const UserDTO = require('../dto/user.dto');

// Listar todos los usuarios
async function getAll(req, res) {
  try {
    const users = await userRepository.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Traer usuario por ID
async function getById(req, res) {
  try {
    const user = await userRepository.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Actualizar usuario
async function updateUser(req, res) {
  try {
    const { first_name, last_name, email, age, password, role } = req.body;
    const updateData = {};

    if (first_name) updateData.first_name = first_name;
    if (last_name) updateData.last_name = last_name;
    if (email) updateData.email = email;
    if (age) updateData.age = age;
    if (role) updateData.role = role;
    if (password) updateData.password = password;

    const user = await userRepository.updateUser(req.params.id, updateData);
    res.json({ message: 'Usuario actualizado', user: new UserDTO(user) });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Eliminar usuario
async function deleteUser(req, res) {
  try {
    await userRepository.deleteUser(req.params.id);
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { getAll, getById, updateUser, deleteUser };
