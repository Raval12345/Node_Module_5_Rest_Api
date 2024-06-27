const express = require('express');
const router = express.Router();

// Array of Products (example)
let products = [
    { id: 1, name: 'Product 1', description: 'Description for Product 1', price: 10.99 },
    { id: 2, name: 'Product 2', description: 'Description for Product 2', price: 19.99 },
    { id: 3, name: 'Product 3', description: 'Description for Product 3', price: 5.99 }
];

// GET all Products
router.get('/products', (req, res) => {
    res.json(products);
});

// GET product by ID
router.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(prod => prod.id === productId);

    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ error: "Product not found" });
    }
});

// POST a new product
router.post('/products', (req, res) => {
    const { name, description, price } = req.body;
    const id = products.length > 0 ? products[products.length - 1].id + 1 : 1; // Generate new ID
    const newProduct = { id, name, description, price };
    products.push(newProduct);
    res.status(201).json({ msg: "Product added successfully", product: newProduct });
});

// PUT (update) a product
// PUT (update,new array added) a task
// PUT (update) a product
router.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, description, price } = req.body;

    let updatedProduct = null;
    products = products.map(product => {
        if (product.id === productId) {
            product.name = name;
            product.description = description;
            product.price = price;
            updatedProduct = product; // Capture the updated product
        }
        return product;
    });

    if (updatedProduct) {
        res.json({ msg: 'Product updated successfully', product: updatedProduct });
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});




// PATCH (partial update) a product
router.patch('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const updates = req.body;

    let updated = false;
    products = products.map(product => {
        if (product.id === productId) {
            Object.keys(updates).forEach(key => {
                if (key in product) {
                    product[key] = updates[key];
                    updated = true;
                }
            });
        }
        return product;
    });

    if (updated) {
        res.json({ msg: 'Product updated successfully' });
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

// DELETE a product
router.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const initialLength = products.length;
    products = products.filter(product => product.id !== productId);

    if (products.length < initialLength) {
        res.json({ msg: 'Product deleted successfully' });
    } else {
        res.status(404).json({ error: 'Product not found' });
    }
});

module.exports = router;
