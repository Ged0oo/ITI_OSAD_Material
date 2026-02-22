const { productsController } = require('../controllers');
const { validateProductCreation, validateProductUpdate, validateStockUpdate } = require('../middlewares/productValidation');
const { validateMongoId } = require('../middlewares/validation');
const { verifyToken } = require('../middlewares/auth');
const Product = require('../models/products');
const express = require('express');
const router = express.Router();

router.post('/', verifyToken, validateProductCreation, async (req, res) => {
  try {
    const productData = { ...req.body, owner: req.userId };
    const result = await productsController.createProduct(productData);
    res.status(201).json(result);
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
})

router.patch('/:id', validateMongoId, verifyToken, validateProductUpdate, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    if(req.role === "admin"){}
    else if (product.owner.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized: You can only edit your own products' });
    }
    const result = await productsController.updateProduct(req.params.id, req.body);
    res.status(200).json(result);
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
})

router.delete('/:id', validateMongoId, verifyToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    if(req.role === "admin"){}
    else if (product.owner.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized: You can only delete your own products' });
    }
    const result = await productsController.deleteProduct(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
})

router.patch("/:id/stock", validateMongoId, verifyToken, validateStockUpdate, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    if(req.role === "admin"){}
    else if (product.owner.toString() !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized: You can only update stock for your own products' });
    }

    const { operation, quantity } = req.body;
    const result = await productsController.updateStock(req.params.id, operation, quantity);
    res.status(200).json(result);
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
})

router.get('/', async (req, res) => {
  try {
    const products = await productsController.getProducts(req.query);
    res.json(products)
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
})

router.get('/products', verifyToken, async (req, res) => {
  try {
    const products = await productsController.getUserProducts(req.userId);
    res.status(200).json(products);
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
})

module.exports = router;