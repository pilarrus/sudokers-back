const express = require('express');
const path = require('path');
const cors = require('cors');

const logger = require('morgan');
const indexRouter = require('./routes/v1');
const usersRouter = require('./routes/v1/users');
const sudokusRouter = require('./routes/v1/sudokus');
const rankingsRouter = require('./routes/v1/rankings');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/v1', indexRouter);
app.use('/v1/users', usersRouter);
app.use('/v1/sudokus', sudokusRouter);
app.use('/v1/rankings', rankingsRouter);

// Route not found (404)
app.use((req, res) => res.status(404).send({ message: `Route ${req.url} Not found.` }));
// 500 - Any server error
app.use((err, req, res) => res.status(500).send({ error: err }));

module.exports = app;
