const cartRepository = require('../repository/cart.repository');

// Crear carrito para usuario
async function createCart(req, res) {
  try {
    const cart = await cartRepository.createCart(req.user._id);
    res.status(201).json({ message: 'Carrito creado', cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Obtener carrito por ID
async function getCart(req, res) {
  try {
    const cart = await cartRepository.getCartById(req.params.cid);
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Agregar producto al carrito
async function addProductToCart(req, res) {
  try {
    const { cid, pid } = req.params;
    const { quantity = 1 } = req.body;

    const cart = await cartRepository.addProductToCart(cid, pid, quantity);
    res.json({ message: 'Producto agregado al carrito', cart });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Procesar compra
async function processPurchase(req, res) {
  try {
    const { cid } = req.params;
    const userEmail = req.user.email;

    const result = await cartRepository.processPurchase(cid, userEmail);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Vaciar carrito
async function clearCart(req, res) {
  try {
    const { cid } = req.params;
    await cartRepository.clearCart(cid);
    res.json({ message: 'Carrito vaciado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Eliminar producto del carrito
async function removeProductFromCart(req, res) {
  try {
    const { cid, pid } = req.params;
    const cart = await cartRepository.removeProductFromCart(cid, pid);
    res.json({ message: 'Producto eliminado del carrito', cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createCart,
  getCart,
  addProductToCart,
  processPurchase,
  clearCart,
  removeProductFromCart
};
