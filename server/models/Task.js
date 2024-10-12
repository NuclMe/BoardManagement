const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: 'Todo' },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board', // Ссылка на коллекцию boards
    required: true,
  },
});

module.exports = mongoose.model('Task', taskSchema);
