const mongoose = require('mongoose');

const { Schema } = mongoose;

const rankingSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  level: { type: String, enum: ['Fácil', 'Medio', 'Difícil', 'Extremo'], required: true },
  date: { type: String, default: '---', required: true },
  timer: { type: String, default: '---', required: true }
});

const model = mongoose.model('Ranking', rankingSchema);

module.exports = model;
