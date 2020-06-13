const express = require('express');
const sudokusController = require('../../controllers/v1/sudokus');
const { isAuthenticated, isAuthorizedSudoku } = require('../../middlewares/auth');
const { createSudoku, deleteSudoku, getSudoku, getSudokusByUser, updateSeconds, updateSudoku, reqValidation } = require('../../middlewares/validation');

const router = express.Router();

router.post('/', reqValidation(createSudoku), isAuthenticated, sudokusController.createSudoku);

router.get('/:sudokuId', reqValidation(getSudoku), sudokusController.getSudoku);

router.get('/user/:userId', reqValidation(getSudokusByUser), isAuthenticated, sudokusController.getSudokusByUser);

router.patch('/:sudokuId', reqValidation(updateSudoku), isAuthenticated, isAuthorizedSudoku, sudokusController.updateSudoku);

router.patch('/seconds/:sudokuId', reqValidation(updateSeconds), isAuthenticated, isAuthorizedSudoku, sudokusController.updateSeconds);

router.delete('/:sudokuId', reqValidation(deleteSudoku), isAuthenticated, isAuthorizedSudoku, sudokusController.deleteSudoku);

module.exports = router;
