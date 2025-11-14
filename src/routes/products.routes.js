const express = require('express');
const router = express.Router();
const passport = require('passport');
const { authorizeRole } = require('../middlewares/authorization');
const productsController = require('../controllers/products.controller');

// Obtener todos los productos (público)
router.get('/', productsController.getAll);

// Obtener producto por ID (público)
router.get('/:pid', productsController.getById);

// Crear producto (solo admin)
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  authorizeRole('admin'),
  productsController.create
);

// Actualizar producto (solo admin)
router.put(
  '/:pid',
  passport.authenticate('jwt', { session: false }),
  authorizeRole('admin'),
  productsController.update
);

// Eliminar producto (solo admin)
router.delete(
  '/:pid',
  passport.authenticate('jwt', { session: false }),
  authorizeRole('admin'),
  productsController.deleteProduct
);

module.exports = router;
