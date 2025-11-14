const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function start() {
  try {
    const app = express();
    app.use(express.json());

    // Conexión a MongoDB Compass
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB Compass');

    app.get('/', (req, res) => res.send('Servidor y MongoDB funcionando'));

    // Rutas
    const sessionsRouter = require('./routes/sessions.routes');
    app.use('/api/sessions', sessionsRouter);

    const usersRouter = require('./routes/users.routes');
    app.use('/api/users', usersRouter);

    const productsRouter = require('./routes/products.routes');
    app.use('/api/products', productsRouter);

    const cartsRouter = require('./routes/carts.routes');
    app.use('/api/carts', cartsRouter);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
  } catch (err) {
    console.error('❌ Error iniciando servidor:', err);
    process.exit(1);
  }
}

start();
