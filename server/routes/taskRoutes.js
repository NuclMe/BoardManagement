const express = require('express');
const {
  addTask,
  getTasks,
  editTask,
  deleteTask,
} = require('../controllers/taskController');

const router = express.Router();

router.post('/:boardId/addTaskToBoard', addTask); // Add a task to a board
router.get('/:boardId/tasks', getTasks); // Get tasks for a board
router.put('/:boardId/tasks/:taskId', editTask); // Edit a task
router.delete('/:boardId/tasks/:taskId', deleteTask);

module.exports = router;
