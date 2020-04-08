const Sudokus = require('../mongo/models/sudokus');

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
  res.send({status: 'OK', message: 'sudoku deleted'});
};

const getSudokus = async (req, res) => {
  try {
    const sudokus = await Sudokus.find();
    res.send({status: 'OK', data: sudokus});

  } catch (e) {
    res.send({status: 'ERROR', message: e.message});
  }
};

const getSudokusByUser = async (req, res) => {
  try {
    const sudokus = await Sudokus.find({
      user: req.params.userId
    });
    res.send({status: 'OK', data: sudokus});

  } catch (e) {
    res.send({status: 'ERROR', message: e.message});
  }
};

const updateSudoku = (req, res) => {
  res.send({status: 'OK', message: 'sudoku updated'});
};

module.exports = {createSudoku, deleteSudoku, getSudokus, getSudokusByUser, updateSudoku};