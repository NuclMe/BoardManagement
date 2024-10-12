const Task = require('../models/Task');
const Board = require('../models/Board');
const mongoose = require('mongoose');

exports.addTask = async (req, res) => {
  const { title, description } = req.body; // Мы будем получать только title и description
  const { boardId } = req.params;

  try {
    // Проверяем, что title и description присутствуют
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: 'Title and description are required' });
    }

    // Получаем доску по ID
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ message: 'Board not found' });
    }

    // Создаем новую задачу с дефолтным статусом 'ToDo'
    const newTask = {
      _id: new mongoose.Types.ObjectId(), // Генерация нового ObjectId
      title,
      description,
      status: 'Todo', // Статус по умолчанию
    };

    // Добавляем новую задачу в массив задач доски
    board.tasks.push(newTask);

    // Сохраняем изменения
    await board.save();

    res.status(201).json(board.tasks); // Возвращаем обновленный список задач
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get tasks for a board
exports.getTasks = async (req, res) => {
  const { boardId } = req.params; // Получаем boardId из параметров запроса
  const { status } = req.query; // Получаем статус из query-параметров (например, ?status=Todo)

  try {
    // Строим запрос к коллекции Task
    const query = { boardId }; // Фильтр по boardId
    if (status) {
      query.status = status; // Добавляем фильтр по статусу, если он задан
    }

    // Находим задачи по критериям
    const tasks = await Task.find(query);

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this board' });
    }

    res.status(200).json(tasks); // Возвращаем список задач
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Edit a task
exports.editTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, status } = req.body;

  // Логируем все данные для проверки
  console.log('Task ID:', taskId);
  console.log('Received Data:', { title, description, status });

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        title: title || undefined,
        description: description || undefined,
        status: status || undefined,
      },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask); // Возвращаем обновленную задачу
  } catch (err) {
    console.error('Error updating task:', err); // Логируем ошибку
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const { taskId } = req.params; // Получаем taskId из параметров
  try {
    await Task.findByIdAndDelete(taskId); // Удаляем задачу по её id
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
exports.addTaskToBoard = async (req, res) => {
  const { boardId } = req.params;
  const { title, description, status } = req.body;

  try {
    // Создаем задачу
    const newTask = new Task({ title, description, status, boardId });
    const savedTask = await newTask.save();

    // Добавляем задачу в массив tasks на доске
    const board = await Board.findById(boardId);
    board.tasks.push(savedTask._id); // Добавляем ссылку на задачу
    await board.save();

    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
