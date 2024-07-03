// index.js
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const productos = require('./data/db');

const app = express();
app.use(express.json());



// Ruta para obtener los detalles de un producto
app.get('/product/:id', (req, res) => {
    const { id } = req.params;
    const producto = productos.find(p => p.id === parseInt(id));
    // const producto ={ "id": 2, "nombre": "Teléfono Inteligente", "precio": 800 }
    if (!producto) {
        return res.status(404).send('Producto no encontrado');
    }
    return res.send(producto);
});

// Ruta para obtener el precio de un producto
app.get('/product/price/:id', (req, res) => {
    const { id } = req.params;
    const producto = productos.find(p => p.id === parseInt(id));
    if (!producto) {
        return res.status(404).send('Producto no encontrado');
    }
    // return res.send(producto.precio.toString() );
    return res.send({precio: producto.precio} );
});

// Ruta para añadir un nuevo producto
app.post('/product', (req, res) => {
    const { id, nombre, precio } = req.body;
    if (!id || !nombre || !precio) {
        return res.status(400).send('Datos incompletos');
    }
    const existe = productos.find(p => p.id === id);
    if (existe) {
        return res.status(409).send('El producto ya existe');
    }
    productos.push({ id, nombre, precio });
    return res.status(201).send({ id, nombre, precio });
});

// Ruta para actualizar el precio de un producto
app.patch('/product/:id', (req, res) => {
    const { id } = req.params;
    const { precio } = req.body;
    const producto = productos.find(p => p.id === parseInt(id));
    if (!producto) {
        return res.status(404).send('Producto no encontrado');
    }
    producto.precio = precio;
    return res.send(producto);
});

const port = process.env.PORT || 5450;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
