const Sudokus = require('../../mongo/models/sudokus');

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

    return res
      .status(201)
      .json({ status: 'OK', data: sudoku });
  } catch (e) {
    return res
      .status(500)
      .json({ status: 'ERROR', message: 'Your request could not be processed, please try again later' });
  }
};

const deleteSudoku = async (req, res) => {
  try {
    await Sudokus.findByIdAndDelete(req.params.sudokuId);
    return res
      .status(200)
      .json({ status: 'OK', message: 'sudoku deleted' });
  } catch (e) {
    return res
      .status(500)
      .json({ status: 'ERROR', message: 'Your request could not be processed, please try again later' });
  }
};

const getSudoku = async (req, res) => {
  try {
    const sudoku = await Sudokus.findById(req.params.sudokuId);
    return res
      .status(200)
      .json({ status: 'OK', message: sudoku });
  } catch (e) {
    return res
      .status(500)
      .json({ status: 'ERROR', message: 'Your request could not be processed, please try again later' });
  }
};

const getSudokusByUser = async (req, res) => {
  try {
    const sudokus = await Sudokus.find({
      user: req.params.userId,
    });
    return res
      .status(200)
      .json({ status: 'OK', data: sudokus });
  } catch (e) {
    return res
      .status(500)
      .json({ status: 'ERROR', message: 'Your request could not be processed, please try again later' });
  }
};

const updateSudoku = async (req, res) => {
  try {
    const { cells } = req.body;

    if (!cells) {
      return res
        .status(400)
        .json({ status: 'ERROR', message: 'cells cannot be null' });
    }

    await Sudokus.findByIdAndUpdate(req.params.sudokuId, {
      cells
    });

    return res
      .status(200)
      .json({ status: 'OK', message: 'sudoku updated' });
  } catch (e) {
    return res
      .status(500)
      .json({ status: 'ERROR', message: 'sudoku not updated' });
  }
};

const updateSeconds = async (req, res) => {
  try {
    const { seconds_accumulated } = req.body;

    if (!seconds_accumulated) {
      return res
        .status(400)
        .json({ status: 'ERROR', message: 'seconds_accumulated cannot be null' });
    }

    await Sudokus.findByIdAndUpdate(req.params.sudokuId, {
      seconds_accumulated
    });

    return res
      .status(200)
      .json({ status: 'OK', message: 'seconds updated' });
  } catch (e) {
    return res
      .status(500)
      .json({ status: 'ERROR', message: 'seconds not updated' });
  }
};

module.exports = {
  createSudoku,
  deleteSudoku,
  getSudoku,
  getSudokusByUser,
  updateSudoku,
  updateSeconds
};
