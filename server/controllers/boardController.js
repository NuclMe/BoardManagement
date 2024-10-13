const Board = require('../models/Board');

// Create a new board
exports.createBoard = async (req, res) => {
  try {
    const newBoard = new Board();
    const savedBoard = await newBoard.save();
    res.status(201).json(savedBoard);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

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
  const { tasks } = req.body;

  try {
    const updatedBoard = await Board.findByIdAndUpdate(
      boardId,
      { tasks },
      { new: true }
    );
    res.json(updatedBoard);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
