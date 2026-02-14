const {productsController} = require('../controllers');
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const {body} = req;
    console.log()
    productsController.createProduct(body);
    res.json({ message: "Product Created Successfully" });
})

router.patch('/:id', async (req, res) => {
    const productId = req.params.id
    const {body} = req;
    await productsController.updateProduct(productId, body)
    res.json({ message: "Product Updated Successfully" });
})

router.delete('/:id', async (req, res) => {
    const productId = req.params.id
    await productsController.deleteProduct(productId)
    res.json({ message: "Product deleted successfully" });
})

router.patch("/:id/stock", async (req, res) => {
    const { operation, quantity } = req.body;
    const productId = req.params.id;
    await productsController.updateStock(productId ,operation, quantity)
    res.json({
        message: "Stock updated successfully",
    });
})

module.exports = router;