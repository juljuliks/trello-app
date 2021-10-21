/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const db = require('../db/models');

router.get('/:userId/boards/:boardId', async (req, res) => {
  let columns;
  const tasks = [];

  try {
    columns = await db.Column.findAll({
      raw: true,
      include: { model: db.Board, where: { userId: req.params.userId, id: req.params.boardId } },
    });
    for await (const column of columns) {
      const curTasks = await db.Task.findAll({ where: { columnId: column.id }, raw: true });
      tasks.push(...curTasks);
    }
  } catch (e) {
    console.log(e);
  }

  const dataFromDb = columns.map((column) => {
    column.id = column.id.toString();
    column.tasks = tasks.map((task) => {
      task.id = task.id.toString();
      return task;
    }).filter((task) => task.columnId === +column.id);
    return column;
  });
  res.json(dataFromDb);
});

router.post('/:userId/boards/:boardId', async (req, res) => {
  const arr = [];
  for (let i = 0; i < Object.entries(req.body).length; i += 1) {
    arr.push(Object.entries(req.body)[i][1]);
  }
  try {
    for await (const column of arr) {
      for await (const task of column.tasks) {
        db.Task.update({ columnId: +column.id }, { where: { id: +task.id } });
      }
    }
  } catch (e) {
    console.log(e);
  }
  res.sendStatus(200);
});

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await db.User.findOne({ where: { email } });
    if (candidate) {
      res.status(400).json({ message: 'Taкой пользователь уже существует' });
      return;
    }
    const user = await db.User.create({ email, password });
    const token = jwt.sign(
      { userId: user.id },
      'secret-key',
      { expiresIn: '1h' },
    );
    res.json({ token, userId: user.id });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' });
    }
    if (password !== user.password) {
      return res.status(400).json({ message: 'Неверный логин или пароль' });
    }
    const token = jwt.sign(
      { userId: user.id },
      'secret-key',
      { expiresIn: '1h' },
    );
    res.json({ token, userId: user.id });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Что-то пошло не так' });
  }
});

router.get('/:id/boards', async (req, res) => {
  let boards;
  try {
    boards = await db.Board.findAll({ where: { userId: req.params.id }, raw: true });
  } catch (e) {
    console.log(e);
  }
  res.json(boards);
});

router.post('/:userId/boards', async (req, res) => {
  let board;
  try {
    board = await db.Board.create({ title: req.body.title, userId: req.params.userId });
  } catch (e) {
    console.log(e);
  }
  res.status(201).json(board);
});

module.exports = router;
