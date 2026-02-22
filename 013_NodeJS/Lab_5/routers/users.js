const { usersController } = require('../controllers');
const { productsController } = require('../controllers');
const { validateUserCreation, validateUserLogin, validateUserUpdate } = require('../middlewares/userValidation');
const { validateMongoId } = require('../middlewares/validation');
const { verifyToken } = require('../middlewares/auth');

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

router.post('/login', validateUserLogin, async (req, res) => {
  try {
    const result = await usersController.login(req.body);
    res.status(200).json(result);
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await usersController.getUsers();
    res.status(200).json(users);
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
})

router.delete('/:id', validateMongoId, verifyToken, async (req, res) => {
  try {
    const result = await usersController.deleteUser(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
})

router.patch('/:id', validateMongoId, verifyToken, validateUserUpdate, async (req, res) => {
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