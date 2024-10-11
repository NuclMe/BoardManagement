const express = require('express');
const {
  createBoard,
  deleteBoard,
  updateBoard,
  getBoardById, // Импортируйте функцию
} = require('../controllers/boardController');

const router = express.Router();

router.post('/create', createBoard); // Создание новой доски
router.get('/:boardId', getBoardById); // Получение доски по ID
router.delete('/:boardId', deleteBoard); // Удаление доски
router.put('/:boardId', updateBoard); // Обновление доски (например, перемещение задач)

module.exports = router;
