const express = require('express');
const path = require('path');
const logger = require('morgan');

const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const sudokusRouter = require('./routes/sudokus');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sudokus', sudokusRouter);

// Route not found (404)
app.use((req, res) => res.status(404).send({ message: `Route ${req.url} Not found.` }));
// 500 - Any server error
app.use((err, req, res) => res.status(500).send({ error: err }));

module.exports = app;
