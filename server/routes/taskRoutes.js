const express = require('express');
const {
  addTask,
  getTasks,
  editTask,
  deleteTask,
} = require('../controllers/taskController');

const router = express.Router();

router.post('/:boardId/addTask', addTask); // Add a task to a board
router.get('/:boardId/tasks', getTasks); // Get tasks for a board
router.put('/tasks/:taskId', editTask); // Edit a task
router.delete('/tasks/:taskId', deleteTask); // Delete a task

module.exports = router;
