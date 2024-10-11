const Board = require('../models/Board');

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

// Update the board, for example when moving tasks between statuses
exports.updateBoard = async (req, res) => {
  const { boardId } = req.params;
  const { tasks } = req.body; // Получаем массив обновленных задач

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
