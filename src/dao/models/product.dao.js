// Modelo temporal para productos (sin Mongoose por ahora)
// En producción usar un modelo de Mongoose

class ProductDAO {
  constructor() {
    this.products = []; // Almacenamiento temporal en memoria
  }

  async findAll() {
    try {
      return this.products;
    } catch (err) {
      throw new Error('Error al obtener productos: ' + err.message);
    }
  }

  async findById(id) {
    try {
      return this.products.find(p => p._id === id);
    } catch (err) {
      throw new Error('Error al obtener producto por ID: ' + err.message);
    }
  }

  async create(productData) {
    try {
      const newProduct = {
        _id: Date.now().toString(),
        ...productData
      };
      this.products.push(newProduct);
      return newProduct;
    } catch (err) {
      throw new Error('Error al crear producto: ' + err.message);
    }
  }

  async update(id, productData) {
    try {
      const index = this.products.findIndex(p => p._id === id);
      if (index === -1) return null;
      this.products[index] = { ...this.products[index], ...productData };
      return this.products[index];
    } catch (err) {
      throw new Error('Error al actualizar producto: ' + err.message);
    }
  }

  async delete(id) {
    try {
      const index = this.products.findIndex(p => p._id === id);
      if (index === -1) return null;
      const deleted = this.products.splice(index, 1);
      return deleted[0];
    } catch (err) {
      throw new Error('Error al eliminar producto: ' + err.message);
    }
  }
}

module.exports = new ProductDAO();
