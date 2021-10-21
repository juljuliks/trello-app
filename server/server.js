const express = require('express');
const logger = require('morgan');
const path = require('path');

const app = express();
app.use(logger('dev'));

const buildHtml = path.resolve(process.env.PWD, '..', 'client', 'build', 'index.html');
const buildStatic = path.resolve(process.env.PWD, '..', 'client', 'build');
const serverStatic = path.resolve(process.env.PWD, 'public');

const apiRouter = require('./routes/api.router');
const usersRouter = require('./routes/users.router');
const boardsRouter = require('./routes/boards.router');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(buildStatic));
app.use(express.static(serverStatic));
app.use(express.json());

app.use('/api', apiRouter);
app.use('/users', usersRouter);
app.use('/boards', boardsRouter);

const PORT = process.env.PORT ?? 5000;

app.get('*', (req, res) => {
  res.sendFile(buildHtml);
});

app.listen(PORT, () => console.log('server has been started'));
