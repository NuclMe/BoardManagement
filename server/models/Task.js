const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true, default: 'Todo' }, // default column is 'Todo'
  boardId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model('Task', TaskSchema);
