const router = require('express').Router();
const db = require('../db/models');

router.post('/:boardId/columns', async (req, res) => {
  let column;
  try {
    column = await db.Column.create({ title: req.body.title, boardId: req.params.boardId });
  } catch (e) {
    console.log(e);
  }
  res.status(201).json(column);
});

router.delete('/:boardId', async (req, res) => {
  try {
    await db.Board.destroy({ where: { id: req.params.boardId } });
  } catch (e) {
    console.log(e);
  }
  res.sendStatus(201);
});

router.post('/:boardId/columns/:columnId', async (req, res) => {
  try {
    await db.Task.create({ body: req.body.body, columnId: req.params.columnId });
  } catch (e) {
    console.log(e);
  }
  res.sendStatus(201);
});

router.put('/:boardId/columns/:columnId', async (req, res) => {
  let column;
  try {
    column = await db.Column.update(
      { title: req.body.title },
      { where: { id: req.params.columnId } },
    );
  } catch (e) {
    console.log(e);
  }
  res.status(201).json(column);
});

router.delete('/:boardId/columns/:columnId', async (req, res) => {
  let column;
  try {
    column = await db.Column.destroy({ where: { id: req.params.columnId } });
    res.status(201).json(column);
  } catch (e) {
    console.log(e);
  }
});

router.put('/:boardId/columns/:columnId/tasks/:taskId', async (req, res) => {
  let task;
  try {
    task = await db.Task.update({ body: req.body.body }, { where: { id: req.params.taskId } });
  } catch (e) {
    console.log(e);
  }
  res.status(201).json(task);
});

router.delete('/:boardId/columns/:columnId/tasks/:taskId', async (req, res) => {
  let task;
  try {
    task = await db.Task.destroy({ where: { id: req.params.taskId } });
  } catch (e) {
    console.log(e);
  }
  res.status(201).json(task);
});

module.exports = router;
