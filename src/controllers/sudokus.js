const createSudoku = (req, res) => {
    res.send({status: 'OK', message: 'sudoku created'});
};

const deleteSudoku = (req, res) => {
    res.send({status: 'OK', message: 'sudoku deleted'});
};

const getSudokus = (req, res) => {
    return res.json({success:true, module:'Sudokus'});
};

const updateSudoku = (req, res) => {
    res.send({status: 'OK', message: 'sudoku updated'});
};

module.exports = { createSudoku, updateSudoku, deleteSudoku, getSudokus};