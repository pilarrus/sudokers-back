const mongoose = require('mongoose');

const { Schema } = mongoose;

const sudokuSchema = new Schema({
  cells: [{ type: Number || [Number]}],
  difficulty: { type: String, enum: ['facil', 'medio', 'dificil', 'experto'], required: true },
  seconds_accumulated: { type: Number, default: 0, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

const model = mongoose.model('Sudoku', sudokuSchema);

module.exports = model;