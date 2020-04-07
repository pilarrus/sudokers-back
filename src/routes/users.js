const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

router.post('/', usersController.createUser);

router.get('/', usersController.getUsers);

router.patch('/', usersController.updateUser);

router.delete('/', usersController.deleteUser);

module.exports = router;
