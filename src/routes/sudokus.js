const express = require('express');
const {
  isAuthenticated,
  isAuthorizedSudoku,
  isValidHostname,
} = require('../middlewares/auth');
const sudokusController = require('../controllers/sudokus');

const router = express.Router();

router.post(
  '/',
  isValidHostname,
  isAuthenticated,
  sudokusController.createSudoku
);

router.get('/:sudokuId', sudokusController.getSudoku);

// router.get('/', sudokusController.getSudokus);

router.get(
  '/user/:userId',
  isValidHostname,
  isAuthenticated,
  sudokusController.getSudokusByUser
);

router.patch(
  '/:sudokuId',
  isValidHostname,
  isAuthenticated,
  isAuthorizedSudoku,
  sudokusController.updateSudoku
);

router.delete(
  '/:sudokuId',
  isValidHostname,
  isAuthenticated,
  isAuthorizedSudoku,
  sudokusController.deleteSudoku
);

module.exports = router;
