const express = require('express');
const path = require('path');
const logger = require('morgan');

const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const sudokusRouter = require('./routes/sudokus');

const app = express();

app.use(logger('dev'));
// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sudokus', sudokusRouter);
app.get('*', (req, res) => res.status(404).send('NOT FOUND'));

module.exports = app;
