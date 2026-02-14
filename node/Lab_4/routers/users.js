const {usersController} = require('../controllers');
const {productsController} = require('../controllers');

const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const {body} = req;
    usersController.createUser(body);
    res.json({ message: "User created successfully" });
})

router.get('/', async (req, res) => {
    const names = await usersController.getUsers();
    res.json(names);
})

router.delete('/:id', async (req, res) => {
    const userId = req.params.id
    await usersController.deleteUser(userId)
    res.json({ message: "User deleted successfully" });
})

router.patch('/:id', async (req, res) => {
    const userId = req.params.id
    const {body} = req;
    await usersController.updateUser(userId, body)
    res.json({});
})

router.get('/:id/products', async (req, res) => {
    const userId = req.params.id
    const products = await productsController.getUserProducts(userId)
    res.json(products);
})

module.exports = router;