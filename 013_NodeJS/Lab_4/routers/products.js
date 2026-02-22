const {productsController} = require('../controllers');
const { validateProductCreation, validateProductUpdate, validateStockUpdate } = require('../middlewares/productValidation');
const { validateMongoId } = require('../middlewares/validation');
const express = require('express');
const router = express.Router();

router.post('/', validateProductCreation, async (req, res) => {
    try {
        const result = await productsController.createProduct(req.body);
        res.status(201).json(result);
    } catch (err) {
        const status = err.status || 500;
        res.status(status).json({ error: err.message });
    }
})

router.patch('/:id', validateMongoId, validateProductUpdate, async (req, res) => {
    try {
        const result = await productsController.updateProduct(req.params.id, req.body);
        res.status(200).json(result);
    } catch (err) {
        const status = err.status || 500;
        res.status(status).json({ error: err.message });
    }
})

router.delete('/:id', validateMongoId, async (req, res) => {
    try {
        const result = await productsController.deleteProduct(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        const status = err.status || 500;
        res.status(status).json({ error: err.message });
    }
})

router.patch("/:id/stock", validateMongoId, validateStockUpdate, async (req, res) => {
    try {
        const { operation, quantity } = req.body;
        const result = await productsController.updateStock(req.params.id, operation, quantity);
        res.status(200).json(result);
    } catch (err) {
        const status = err.status || 500;
        res.status(status).json({ error: err.message });
    }
})

router.get('/', async (req, res) => {
    const products = await productsController.getProducts(req.query);
    res.json(products)
})

module.exports = router;