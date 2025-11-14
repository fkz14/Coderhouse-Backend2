const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

// Conexión a MongoDB Compass
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB Compass'))
  .catch(err => console.error('❌ Error conectando a Mongo:', err));

app.get('/', (req, res) => res.send('Servidor y MongoDB funcionando'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));

// Rutas
const sessionsRouter = require('./routes/sessions.routes');
app.use('/api/sessions', sessionsRouter);

const usersRouter = require('./routes/users.routes');
app.use('/api/users', usersRouter);

const productsRouter = require('./routes/products.routes');
app.use('/api/products', productsRouter);

const cartsRouter = require('./routes/carts.routes');
app.use('/api/carts', cartsRouter);
