const express = require('express');
const {
  addTodo,
  getTodos,
  editTodo,
  deleteTodo,
} = require('../controllers/todoController');

const router = express.Router();

router.post('/add', addTodo);
router.get('/', getTodos);
router.put('/edit/:id', editTodo);
router.delete('/delete/:id', deleteTodo);

module.exports = router;
