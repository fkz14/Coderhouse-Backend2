const cartDAO = require('../dao/models/cart.dao');
const productRepository = require('./product.repository');
const ticketRepository = require('./ticket.repository');

class CartRepository {
  // Crear carrito para usuario
  async createCart(userId) {
    try {
      return await cartDAO.create({ userId });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Obtener carrito por ID
  async getCartById(cartId) {
    try {
      return await cartDAO.findById(cartId);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Agregar producto al carrito (solo usuarios)
  async addProductToCart(cartId, productId, quantity = 1) {
    try {
      const cart = await cartDAO.findById(cartId);
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }

      const product = await productRepository.getProductById(productId);
      if (!product) {
        throw new Error('Producto no encontrado');
      }

      // Verificar si el producto ya está en el carrito
      const existingProduct = cart.products.find(p => p.productId === productId);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({
          productId,
          title: product.title,
          price: product.price,
          quantity
        });
      }

      return await cartDAO.update(cartId, cart);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Procesar compra
  async processPurchase(cartId, userEmail) {
    try {
      const cart = await cartDAO.findById(cartId);
      if (!cart || cart.products.length === 0) {
        throw new Error('Carrito vacío o no encontrado');
      }

      const purchasedProducts = [];
      const outOfStockProducts = [];
      let totalAmount = 0;

      // Procesar cada producto
      for (const item of cart.products) {
        const stockResult = await productRepository.validateAndReduceStock(
          item.productId,
          item.quantity
        );

        if (stockResult.available) {
          purchasedProducts.push({
            productId: item.productId,
            title: item.title,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.price * item.quantity
          });
          totalAmount += item.price * item.quantity;
        } else {
          outOfStockProducts.push({
            productId: item.productId,
            title: item.title,
            requestedQty: item.quantity,
            availableQty: stockResult.availableQty
          });
        }
      }

      // Generar ticket si hay productos comprados
      let ticket = null;
      if (purchasedProducts.length > 0) {
        ticket = await ticketRepository.createTicket({
          purchaser: userEmail,
          amount: totalAmount,
          products: purchasedProducts
        });
      }

      // Vaciar carrito
      await cartDAO.update(cartId, { products: [] });

      return {
        status: 'success',
        purchasedProducts,
        outOfStockProducts,
        ticket
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Vaciar carrito
  async clearCart(cartId) {
    try {
      return await cartDAO.update(cartId, { products: [] });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Eliminar producto del carrito
  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await cartDAO.findById(cartId);
      if (!cart) {
        throw new Error('Carrito no encontrado');
      }

      cart.products = cart.products.filter(p => p.productId !== productId);
      return await cartDAO.update(cartId, cart);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = new CartRepository();
