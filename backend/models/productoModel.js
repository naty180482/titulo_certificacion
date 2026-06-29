const pool = require('../db/connection');

// Obtener todos los productos (con JOIN)
const getProductos = async () => {
    const result = await pool.query(`
        SELECT p.id, p.nombre, p.descripcion, p.precio, p.stock, 
               p.disponible, c.nombre AS categoria
        FROM productos_producto p
        JOIN productos_categoria c ON p.categoria_id = c.id
        ORDER BY p.fecha_creacion DESC
    `);
    return result.rows;
};

// Obtener producto por ID
const getProductoById = async (id) => {
    const result = await pool.query(`
        SELECT p.id, p.nombre, p.descripcion, p.precio, p.stock, 
               p.disponible, c.nombre AS categoria
        FROM productos_producto p
        JOIN productos_categoria c ON p.categoria_id = c.id
        WHERE p.id = $1
    `, [id]);
    return result.rows[0];
};

// Crear producto
const createProducto = async (nombre, descripcion, precio, stock, categoria_id, disponible) => {
    const result = await pool.query(`
        INSERT INTO productos_producto 
        (nombre, descripcion, precio, stock, categoria_id, disponible)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
    `, [nombre, descripcion, precio, stock, categoria_id, disponible]);
    return result.rows[0];
};

// Actualizar producto
const updateProducto = async (id, nombre, descripcion, precio, stock, categoria_id, disponible) => {
    const result = await pool.query(`
        UPDATE productos_producto
        SET nombre = $1, descripcion = $2, precio = $3, 
            stock = $4, categoria_id = $5, disponible = $6,
            fecha_actualizacion = NOW()
        WHERE id = $7
        RETURNING *
    `, [nombre, descripcion, precio, stock, categoria_id, disponible, id]);
    return result.rows[0];
};

// Eliminar producto
const deleteProducto = async (id) => {
    const result = await pool.query(`
        DELETE FROM productos_producto WHERE id = $1 RETURNING *
    `, [id]);
    return result.rows[0];
};

module.exports = {
    getProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto
};