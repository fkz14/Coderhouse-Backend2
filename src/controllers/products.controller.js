const productRepository = require('../repository/product.repository');

// Obtener todos los productos (público)
async function getAll(req, res) {
  try {
    const products = await productRepository.getAllProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Obtener producto por ID (público)
async function getById(req, res) {
  try {
    const product = await productRepository.getProductById(req.params.pid);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Crear producto (solo admin)
async function create(req, res) {
  try {
    const product = await productRepository.createProduct(req.body);
    res.status(201).json({ message: 'Producto creado', product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Actualizar producto (solo admin)
async function update(req, res) {
  try {
    const product = await productRepository.updateProduct(req.params.pid, req.body);
    res.json({ message: 'Producto actualizado', product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Eliminar producto (solo admin)
async function deleteProduct(req, res) {
  try {
    await productRepository.deleteProduct(req.params.pid);
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { getAll, getById, create, update, deleteProduct };
