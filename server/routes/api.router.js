/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */

const router = require('express').Router();
const db = require('../db/models');

router.post('/update-tasks', async (req, res) => {
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

router.post('/update-columns', async (req, res) => {
  console.log(req.body);
  try {
    for await (const column of req.body) {
      db.Column.update({ id: +column.id }, { where: { id: +column.id } });
      console.log('updated', +column.id);
    }
  } catch (e) {
    console.log(e);
  }
  res.sendStatus(200);
});

module.exports = router;
