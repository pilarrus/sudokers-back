const express = require('express');
const sudokusController = require('../../controllers/v1/sudokus');
const { isAuthenticated, isAuthorizedSudoku, isValidHostname } = require('../../middlewares/auth');
const { createSudoku, deleteSudoku, getSudoku, getSudokusByUser, updateSeconds, updateSudoku, reqValidation } = require('../../middlewares/validation');

const router = express.Router();

router.post('/', reqValidation(createSudoku), isValidHostname, isAuthenticated, sudokusController.createSudoku);

router.get('/:sudokuId', reqValidation(getSudoku), sudokusController.getSudoku);

// router.get('/', sudokusController.getSudokus);

router.get('/user/:userId', reqValidation(getSudokusByUser), isValidHostname, isAuthenticated, sudokusController.getSudokusByUser);

router.patch('/:sudokuId', reqValidation(updateSudoku), isValidHostname, isAuthenticated, isAuthorizedSudoku, sudokusController.updateSudoku);

router.patch('/seconds/:sudokuId', reqValidation(updateSeconds), isValidHostname, isAuthenticated, isAuthorizedSudoku, sudokusController.updateSeconds);

router.delete('/:sudokuId', reqValidation(deleteSudoku), isValidHostname, isAuthenticated, isAuthorizedSudoku, sudokusController.deleteSudoku);

module.exports = router;
