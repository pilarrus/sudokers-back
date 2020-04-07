var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  return res.json({success: true, message: 'Home'});
});

module.exports = router;
