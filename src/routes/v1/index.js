const express = require('express');
const usersController = require('../../controllers/v1/users');
const { login, refreshLogin, reqValidation } = require('../../middlewares/validation');

const router = express.Router();

/* GET home page. */
// router.get('/', (req, res) => res.json({ success: true, message: 'Home' }));

router.post('/login', reqValidation(login), usersController.login);

router.post('/refreshLogin', reqValidation(refreshLogin), usersController.refreshLogin);

module.exports = router;
