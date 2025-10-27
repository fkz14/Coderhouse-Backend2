const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/passport')(); // inicializa estrategias
const usersController = require('../controllers/users.controller');

// Listar todos los usuarios
router.get('/', passport.authenticate('jwt', { session: false }), usersController.getAll);

// Traer usuario por ID
router.get('/:id', passport.authenticate('jwt', { session: false }), usersController.getById);

// Actualizar usuario
router.put('/:id', passport.authenticate('jwt', { session: false }), usersController.updateUser);

// Eliminar usuario
router.delete('/:id', passport.authenticate('jwt', { session: false }), usersController.deleteUser);

module.exports = router;
