const express = require('express');
const rankingsController = require('../../controllers/v1/rankings');
const { initialiseRanking, updateRanking, reqValidation } = require('../../middlewares/validation');
const { isAuthenticated } = require('../../middlewares/auth');

const router = express.Router();

router.post('/initialise/:userId', reqValidation(initialiseRanking), isAuthenticated, rankingsController.initialiseRanking);

router.get('/:userId', reqValidation(initialiseRanking), isAuthenticated, rankingsController.getResults);

router.patch('/:userId', reqValidation(updateRanking), isAuthenticated, rankingsController.updateRanking);

module.exports = router;
