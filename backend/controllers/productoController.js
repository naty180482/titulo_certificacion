const model = require('../models/productoModel');

// GET /api/productos - Listar todos
const listar = async (req, res) => {
    try {
        const productos = await model.getProductos();
        res.json({ success: true, data: productos });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// GET /api/productos/:id - Obtener uno
const obtener = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await model.getProductoById(id);
        if (!producto) {
            return res.status(404).json({ success: false, error: 'Producto no encontrado' });
        }
        res.json({ success: true, data: producto });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// POST /api/productos - Crear
const crear = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock, categoria_id, disponible } = req.body;
        
        // Validaciones
        if (!nombre) return res.status(400).json({ error: 'Nombre requerido' });
        if (precio <= 0) return res.status(400).json({ error: 'Precio > 0' });
        if (stock < 0) return res.status(400).json({ error: 'Stock >= 0' });
        
        const producto = await model.createProducto(
            nombre, descripcion, precio, stock, categoria_id, disponible
        );
        res.status(201).json({ success: true, data: producto });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// PUT /api/productos/:id - Actualizar
const actualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, stock, categoria_id, disponible } = req.body;
        
        const existe = await model.getProductoById(id);
        if (!existe) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        
        const producto = await model.updateProducto(
            id, nombre, descripcion, precio, stock, categoria_id, disponible
        );
        res.json({ success: true, data: producto });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// DELETE /api/productos/:id - Eliminar
const eliminar = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await model.deleteProducto(id);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({ success: true, message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    listar,
    obtener,
    crear,
    actualizar,
    eliminar
};