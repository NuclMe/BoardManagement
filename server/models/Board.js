const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
  tasks: [
    {
      _id: mongoose.Schema.Types.ObjectId, // task ID должен быть ObjectId
      title: { type: String, required: true },
      description: { type: String, required: true },
      status: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Board', BoardSchema);
