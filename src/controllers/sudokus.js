const Sudokus = require('../mongo/models/sudokus')

const createSudoku = async (req, res) => {
  try {
    const { cells, difficulty, seconds_accumulated, userId } = req.body;

    const sudoku = await Sudokus.create({
      cells,
      difficulty,
      seconds_accumulated,
      user: userId
    });

    res.send({status: 'OK', data: sudoku});

  } catch (e) {
    res.status(500).send({status: 'ERROR', message: e.message});
  }
};

const deleteSudoku = (req, res) => {
  return res.send({status: 'OK', message: 'sudoku deleted'});
};

const getSudokus = (req, res) => {
  return res.json({success: true, module: 'Sudokus'});
};

const updateSudoku = (req, res) => {
  return res.send({status: 'OK', message: 'sudoku updated'});
};

module.exports = {createSudoku, updateSudoku, deleteSudoku, getSudokus};