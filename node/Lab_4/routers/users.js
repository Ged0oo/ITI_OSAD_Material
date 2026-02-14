const {usersController} = require('../controllers');
const {productsController} = require('../controllers');
const { validateUserCreation, validateUserUpdate } = require('../middlewares/userValidation');
const { validateMongoId } = require('../middlewares/validation');

const express = require('express');
const router = express.Router();

router.post('/', validateUserCreation, async (req, res) => {
    try {
        const result = await usersController.createUser(req.body);
        res.status(201).json(result);
    } catch (err) {
        const status = err.status || 500;
        res.status(status).json({ error: err.message });
    }
})

router.get('/', async (req, res) => {
    try {
        const names = await usersController.getUsers();
        res.status(200).json(names);
    } catch (err) {
        const status = err.status || 500;
        res.status(status).json({ error: err.message });
    }
})

router.delete('/:id', validateMongoId, async (req, res) => {
    try {
        const result = await usersController.deleteUser(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        const status = err.status || 500;
        res.status(status).json({ error: err.message });
    }
})

router.patch('/:id', validateMongoId, validateUserUpdate, async (req, res) => {
    try {
        const result = await usersController.updateUser(req.params.id, req.body);
        res.status(200).json(result);
    } catch (err) {
        const status = err.status || 500;
        res.status(status).json({ error: err.message });
    }
})

router.get('/:id/products', validateMongoId, async (req, res) => {
    try {
        const products = await productsController.getUserProducts(req.params.id);
        res.status(200).json(products);
    } catch (err) {
        const status = err.status || 500;
        res.status(status).json({ error: err.message });
    }
})

module.exports = router;