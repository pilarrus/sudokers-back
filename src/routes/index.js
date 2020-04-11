const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => res.json({ success: true, message: 'Home' }));

router.post('/login', usersController.login);

module.exports = router;
