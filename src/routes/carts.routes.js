const express = require('express');
const router = express.Router();
const passport = require('passport');
const { authorizeRole } = require('../middlewares/authorization');
const cartsController = require('../controllers/carts.controller');

// Crear carrito para usuario
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  authorizeRole('user'),
  cartsController.createCart
);

// Obtener carrito
router.get(
  '/:cid',
  passport.authenticate('jwt', { session: false }),
  cartsController.getCart
);

// Agregar producto al carrito (solo usuario)
router.post(
  '/:cid/product/:pid',
  passport.authenticate('jwt', { session: false }),
  authorizeRole('user'),
  cartsController.addProductToCart
);

// Procesar compra (solo usuario)
router.post(
  '/:cid/purchase',
  passport.authenticate('jwt', { session: false }),
  authorizeRole('user'),
  cartsController.processPurchase
);

// Vaciar carrito
router.delete(
  '/:cid',
  passport.authenticate('jwt', { session: false }),
  cartsController.clearCart
);

// Eliminar producto del carrito
router.delete(
  '/:cid/product/:pid',
  passport.authenticate('jwt', { session: false }),
  cartsController.removeProductFromCart
);

module.exports = router;
