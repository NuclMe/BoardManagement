const express = require('express');
const {
  addTask,
  getTasks,
  editTask,
  deleteTask,
  updateTaskStatus,
} = require('../controllers/taskController');

const router = express.Router();

router.post('/:boardId/addTask', addTask); // Add a task to a board
router.get('/:boardId/tasks', getTasks); // Get tasks for a board
router.put('/:boardId/tasks/:taskId', editTask); // Edit a task
router.delete('/:boardId/tasks/:taskId', deleteTask);
router.put('/:boardId/tasks/:taskId/status', updateTaskStatus);

module.exports = router;
