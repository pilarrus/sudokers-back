const Sudokus = require('../mongo/models/sudokus');

const createSudoku = async (req, res) => {
  try {
    const { userId } = req.sessionData;
    const { cells, difficulty, seconds_accumulated } = req.body;

    const sudoku = await Sudokus.create({
      cells,
      difficulty,
      seconds_accumulated,
      user: userId,
    });

    res.send({ status: 'OK', data: sudoku });
  } catch (e) {
    res.status(500).send({ status: 'ERROR', message: e.message });
  }
};

const deleteSudoku = async (req, res) => {
  try {
    await Sudokus.findByIdAndDelete(req.params.sudokuId);
    res.send({ status: 'OK', message: 'sudoku deleted' });
  } catch (e) {
    res.status(500).send({ status: 'ERROR', message: e.message });
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

const getSudoku = async (req, res) => {
  try {
    const sudoku = await Sudokus.findById(req.params.sudokuId);
    res.send({ status: 'OK', message: sudoku });
  } catch (e) {
    res.send({ status: 'ERROR', message: e.message });
  }
};

const getSudokusByUser = async (req, res) => {
  try {
    const sudokus = await Sudokus.find({
      user: req.params.userId,
    });
    res.send({ status: 'OK', data: sudokus });
  } catch (e) {
    res.send({ status: 'ERROR', message: e.message });
  }
};

const updateSudoku = async (req, res) => {
  try {
    const { cells, seconds_accumulated } = req.body;
    if (!cells || !seconds_accumulated) {
      return res.status(400).send({
        status: 'ERROR',
        message: 'cells and seconds_accumulated cannot be null',
      });
    }
    await Sudokus.findByIdAndUpdate(req.params.sudokuId, {
      cells,
      seconds_accumulated,
    });
    return res.send({ status: 'OK', message: 'sudoku updated' });
  } catch (e) {
    return res.status(500).send({ status: 'ERROR', message: 'sudoku updated' });
  }
};

module.exports = {
  createSudoku,
  deleteSudoku,
  getSudoku,
  // getSudokus,
  getSudokusByUser,
  updateSudoku,
};
