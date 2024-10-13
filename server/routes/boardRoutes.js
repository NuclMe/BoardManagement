const express = require('express');
const {
  createBoard,
  deleteBoard,
  updateBoard,
} = require('../controllers/boardController');

const router = express.Router();

router.post('/create', createBoard); // Create a new board
router.delete('/:boardId', deleteBoard); // Delete a board
router.put('/:boardId', updateBoard); // Update a board

module.exports = router;
