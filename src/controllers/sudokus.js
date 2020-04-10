const Sudokus = require('../mongo/models/sudokus');

const createSudoku = async (req, res) => {
  try {
    const userId = req.sessionData.userId;
    const { cells, difficulty, seconds_accumulated } = req.body;

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

const deleteSudoku = async (req, res) => {
  try {
    console.log('req.params.sudokuId: ', req.params.sudokuId);
    if(req.sessionData.userId !== req.body.userId) {
      return res.status(403).send({status: 'ACCESS_DENIED', message: 'Unauthorized user'});
    }
    await Sudokus.findByIdAndDelete(req.params.sudokuId);
    res.send({status: 'OK', message: 'sudoku deleted'});
  } catch (e) {
    res.status(500).send({status: 'ERROR', message: e.message});
  }
};

// const getSudokus = async (req, res) => {
//   try {
//     const sudokus = await Sudokus.find();
//     res.send({status: 'OK', data: sudokus});
//
//   } catch (e) {
//     res.send({status: 'ERROR', message: e.message});
//   }
// };

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

const updateSudoku = async (req, res) => {
  try {
    const { cells, seconds_accumulated } = req.body;
    if(!cells || !seconds_accumulated) {
      return res.status(400).send({status: 'ERROR', message: 'cells and seconds_accumulated cannot be null'});
    }
    await Sudokus.findByIdAndUpdate(req.params.sudokuId, {
      cells, seconds_accumulated
    });
    res.send({status: 'OK', message: 'sudoku updated'});

  } catch (e) {
    console.log('e: ', e);
    res.status(500).send({status: 'ERROR', message: 'sudoku updated'});
  }
};

module.exports = {
  createSudoku,
  deleteSudoku,
  // getSudokus,
  getSudokusByUser,
  updateSudoku
};