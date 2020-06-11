const express = require('express');
const { isAuthenticated, isAuthorized, isValidHostname } = require('../../middlewares/auth');
const { deleteUser, register, updateUser, reqValidation } = require('../../middlewares/validation');
const usersController = require('../../controllers/v1/users');

const router = express.Router();

router.post('/', reqValidation(register), usersController.createUser);

// router.get('/', usersController.getUsers);

router.get('/isAvailable', usersController.isAvailable);

router.patch('/:id', isValidHostname, isAuthenticated, isAuthorized, reqValidation(updateUser), usersController.updateUser);

router.delete('/:id', isValidHostname, isAuthenticated, isAuthorized, reqValidation(deleteUser), usersController.deleteUser);

module.exports = router;
