const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  refresh_token: { type: String }
});

const model = mongoose.model('User', userSchema);

module.exports = model;
