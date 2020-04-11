const express = require('express');
const {
  isAuthenticated,
  isAuthorized,
  isValidHostname,
} = require('../middlewares/auth');
const usersController = require('../controllers/users');

const router = express.Router();

router.post('/', usersController.createUser);

// router.get('/', usersController.getUsers);

router.get('/isAvailable', usersController.isAvailable);

router.patch(
  '/:id',
  isValidHostname,
  isAuthenticated,
  isAuthorized,
  usersController.updateUser
);

router.delete(
  '/:id',
  isValidHostname,
  isAuthenticated,
  isAuthorized,
  usersController.deleteUser
);

module.exports = router;
