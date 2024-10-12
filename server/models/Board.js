const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true, default: 'Todo' },
});

const BoardSchema = new mongoose.Schema({
  tasks: [TaskSchema], // Массив с полной структурой задачи
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Board', BoardSchema);
