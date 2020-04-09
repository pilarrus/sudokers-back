const mongoose = require('mongoose');

const { Schema } = mongoose;

const sudokuSchema = new Schema({
  cells: [{
    position: {
      row: Number,
      column: Number
    },
    writable: Boolean,
    number: Number,
    grid: [Number]
  }],
  difficulty: { type: String, enum: ['facil', 'medio', 'dificil', 'experto'], required: true },
  seconds_accumulated: { type: Number, default: 0, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

const model = mongoose.model('Sudoku', sudokuSchema);

module.exports = model;