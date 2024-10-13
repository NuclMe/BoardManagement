const Task = require('../models/Task');

exports.addTask = async (req, res) => {
  const { title, description, status } = req.body;
  const { boardId } = req.params;

  try {
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: 'Title and description are required' });
    }

    const taskStatus = status || 'Todo';

    const newTask = new Task({
      title,
      description,
      status: taskStatus,
      boardId,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get tasks for a board
exports.getTasks = async (req, res) => {
  const { boardId } = req.params;
  const { status } = req.query;

  try {
    const query = { boardId };
    if (status) {
      query.status = status;
    }

    const tasks = await Task.find(query);

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this board' });
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Edit a task
exports.editTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, status } = req.body;

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

    res.json(updatedTask);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    await Task.findByIdAndDelete(taskId);
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
// Update task status
exports.updateTaskStatus = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
