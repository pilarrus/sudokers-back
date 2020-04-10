const express = require('express');
const { isAuthenticated, isValidHostname } = require('../middlewares/auth');
const sudokusController = require('../controllers/sudokus');

const router = express.Router();

router.post('/', isValidHostname, isAuthenticated, sudokusController.createSudoku);

router.get('/', sudokusController.getSudokus);

router.get('/user/:userId', sudokusController.getSudokusByUser);

router.patch('/', sudokusController.updateSudoku);

router.delete('/:sudokuId', isValidHostname, isAuthenticated, sudokusController.deleteSudoku);

module.exports = router;