const express = require('express');
const { isAuthenticated, isAuthorized } = require('../../middlewares/auth');
const { deleteUser, register, updateUser, reqValidation } = require('../../middlewares/validation');
const usersController = require('../../controllers/v1/users');

const router = express.Router();

router.post('/', reqValidation(register), usersController.createUser);

router.get('/isAvailable', usersController.isAvailable);

router.patch('/:id', isAuthenticated, isAuthorized, reqValidation(updateUser), usersController.updateUser);

router.delete('/:id', isAuthenticated, isAuthorized, reqValidation(deleteUser), usersController.deleteUser);

module.exports = router;
