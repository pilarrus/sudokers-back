const express = require('express');
const path = require('path');
const logger = require('morgan');

const indexRouter = require('./routes/v1');
const usersRouter = require('./routes/v1/users');
const sudokusRouter = require('./routes/v1/sudokus');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/v1', indexRouter);
app.use('/v1/users', usersRouter);
app.use('/v1/sudokus', sudokusRouter);

// Route not found (404)
app.use((req, res) => res.status(404).send({ message: `Route ${req.url} Not found.` }));
// 500 - Any server error
app.use((err, req, res) => res.status(500).send({ error: err }));

module.exports = app;
