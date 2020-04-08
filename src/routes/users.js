const express = require('express');
const { isAuth, isValidHostname } = require('../middlewares/auth');
const usersController = require('../controllers/users');

const router = express.Router();

router.post('/', usersController.createUser);

router.get('/', usersController.getUsers);

router.patch('/', isValidHostname, isAuth, usersController.updateUser);

router.delete('/', usersController.deleteUser);

module.exports = router;
