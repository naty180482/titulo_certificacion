const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'API funcionando correctamente' });
});

// Rutas de productos
const productosRoutes = require('./routes/productos');
app.use('/api/productos', productosRoutes);

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📦 API productos: http://localhost:${PORT}/api/productos`);
});