const express = require('express');
const sudokusController = require('../controllers/sudokus');

const router = express.Router();

router.post('/', sudokusController.createSudoku);

router.get('/', sudokusController.getSudokus);

router.patch('/', sudokusController.updateSudoku);

router.delete('/', sudokusController.deleteSudoku);

module.exports = router;