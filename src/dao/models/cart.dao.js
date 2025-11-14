// Modelo temporal para carritos (sin Mongoose por ahora)

class CartDAO {
  constructor() {
    this.carts = []; // Almacenamiento temporal en memoria
  }

  async findAll() {
    try {
      return this.carts;
    } catch (err) {
      throw new Error('Error al obtener carritos: ' + err.message);
    }
  }

  async findById(id) {
    try {
      return this.carts.find(c => c._id === id);
    } catch (err) {
      throw new Error('Error al obtener carrito por ID: ' + err.message);
    }
  }

  async create(cartData) {
    try {
      const newCart = {
        _id: Date.now().toString(),
        userId: cartData.userId,
        products: [],
        createdAt: new Date()
      };
      this.carts.push(newCart);
      return newCart;
    } catch (err) {
      throw new Error('Error al crear carrito: ' + err.message);
    }
  }

  async update(id, cartData) {
    try {
      const index = this.carts.findIndex(c => c._id === id);
      if (index === -1) return null;
      this.carts[index] = { ...this.carts[index], ...cartData };
      return this.carts[index];
    } catch (err) {
      throw new Error('Error al actualizar carrito: ' + err.message);
    }
  }

  async delete(id) {
    try {
      const index = this.carts.findIndex(c => c._id === id);
      if (index === -1) return null;
      const deleted = this.carts.splice(index, 1);
      return deleted[0];
    } catch (err) {
      throw new Error('Error al eliminar carrito: ' + err.message);
    }
  }
}

module.exports = new CartDAO();
