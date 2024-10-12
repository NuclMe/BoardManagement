const Board = require('../models/Board');
const mongoose = require('mongoose');
// Create a new board
exports.createBoard = async (req, res) => {
  try {
    const newBoard = new Board(); // No name, just creating a new board with an ID
    const savedBoard = await newBoard.save();
    res.status(201).json(savedBoard);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a board by its ID
exports.deleteBoard = async (req, res) => {
  const { boardId } = req.params;

  try {
    await Board.findByIdAndDelete(boardId);
    res.json({ message: 'Board deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateBoard = async (req, res) => {
  const { boardId } = req.params;
  const { tasks } = req.body; // Получаем массив обновленных задач
  console.log('Received data:', req.body); // Выводим все данные, которые пришли в запросе
  console.log('Tasks:', tasks);
  if (!Array.isArray(tasks)) {
    return res.status(400).json({ message: 'Tasks must be an array' });
  }

  try {
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    // Логика обновления каждой задачи
    tasks.forEach((updatedTask) => {
      const existingTaskIndex = board.tasks.findIndex(
        (task) => task._id.toString() === updatedTask._id
      );
      if (existingTaskIndex !== -1) {
        board.tasks[existingTaskIndex] = {
          ...board.tasks[existingTaskIndex],
          ...updatedTask,
        }; // Обновляем задачу по ее _id
      }
    });

    const updatedBoard = await board.save(); // Сохраняем обновленную доску
    res.json(updatedBoard);
  } catch (error) {
    console.error('Error updating board:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBoardWithTasks = async (req, res) => {
  const { boardId } = req.params;

  try {
    const board = await Board.findById(boardId).populate('tasks'); // Подтягиваем задачи с помощью populate
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }
    res.json(board);
  } catch (error) {
    console.error('Error fetching board:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getBoardById = async (req, res) => {
  const { boardId } = req.params; // Извлечение boardId из параметров

  try {
    const board = await Board.findById(boardId); // Поиск доски по ID
    if (!board) {
      return res.status(404).json({ message: 'Board not found' }); // Если доска не найдена
    }
    res.json(board); // Возврат найденной доски
  } catch (error) {
    console.error('Error fetching board:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.addTaskToBoard = async (req, res) => {
  const { boardId } = req.params;
  const { title, description } = req.body;

  try {
    // Найдем доску по ID
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    // Проверяем наличие title и description
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: 'Title and description are required' });
    }

    // Создаем новую задачу
    const newTask = {
      _id: new mongoose.Types.ObjectId(), // Генерация нового ID для задачи
      title,
      description,
      status: 'Todo', // Статус по умолчанию
    };

    // Добавляем задачу в массив tasks
    board.tasks.push(newTask);

    // Сохраняем изменения
    await board.save();

    res.status(201).json(newTask); // Возвращаем созданную задачу
  } catch (error) {
    console.error('Error adding task to board:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
