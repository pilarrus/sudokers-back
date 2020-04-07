const createSudoku = (req, res) => {
  console.log('req.body', req.body);
  return res.send({status: 'OK', message: 'sudoku created'});
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