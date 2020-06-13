const jwt = require('jsonwebtoken');
const Sudokus = require('../mongo/models/sudokus');

const isAuthenticated = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      throw {
        code: 401,
        status: 'ACCESS_DENIED',
        message: 'Missing header token',
      };
    }

    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.sessionData = { userId: data.userId };
    next();
  } catch (e) {
    const httpCode = e.code || 401;
    const httpStatus = e.status || 'ERROR';
    res.status(httpCode).json({ status: httpStatus, message: e.message });
  }
};

const isAuthorized = (req, res, next) => {
  if (req.sessionData.userId !== req.params.id) {
    return res
      .status(403)
      .json({ status: 'ACCESS_DENIED', message: 'Unauthorized user' });
  }
  next();
};

const isAuthorizedSudoku = async (req, res, next) => {
  try {
    const sudokus = await Sudokus.find({ user: req.sessionData.userId });
    const matchSudoku = sudokus.filter(
      (sudoku) => sudoku._id.toString() === req.params.sudokuId
    );
    if (!matchSudoku.length) {
      return res
        .status(403)
        .json({ status: 'ACCESS_DENIED', message: 'Unauthorized user' });
    }
    next();
  } catch (e) {
    return res
      .status(403)
      .json({ status: 'ACCESS_DENIED', message: 'Unauthorized user' });
  }
};

module.exports = {
  isAuthenticated,
  isAuthorized,
  isAuthorizedSudoku
};
