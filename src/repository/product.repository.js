const productDAO = require('../dao/models/product.dao');

class ProductRepository {
  // Obtener todos los productos (público)
  async getAllProducts() {
    try {
      return await productDAO.findAll();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Obtener producto por ID (público)
  async getProductById(id) {
    try {
      return await productDAO.findById(id);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Crear producto (solo admin)
  async createProduct(productData) {
    try {
      if (!productData.title || !productData.price || !productData.stock) {
        throw new Error('Faltan datos requeridos: title, price, stock');
      }

      return await productDAO.create(productData);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Actualizar producto (solo admin)
  async updateProduct(id, productData) {
    try {
      const product = await productDAO.findById(id);
      if (!product) {
        throw new Error('Producto no encontrado');
      }

      return await productDAO.update(id, productData);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Eliminar producto (solo admin)
  async deleteProduct(id) {
    try {
      const product = await productDAO.findById(id);
      if (!product) {
        throw new Error('Producto no encontrado');
      }

      return await productDAO.delete(id);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Validar stock
  async validateAndReduceStock(productId, quantity) {
    try {
      const product = await productDAO.findById(productId);
      if (!product) {
        throw new Error('Producto no encontrado');
      }

      if (product.stock < quantity) {
        return { available: false, availableQty: product.stock };
      }

      // Reducir stock
      product.stock -= quantity;
      await productDAO.update(productId, { stock: product.stock });

      return { available: true, product };
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = new ProductRepository();
