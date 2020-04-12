const express = require('express');
const usersController = require('../../controllers/v1/users');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => res.json({ success: true, message: 'Home' }));

router.post('/login', usersController.login);

router.post('/refreshLogin', usersController.refreshLogin);

module.exports = router;
