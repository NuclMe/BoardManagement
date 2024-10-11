const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task', // Ссылка на коллекцию tasks
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Board', BoardSchema);
