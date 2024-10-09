const Task = require('../models/Task');
const Board = require('../models/Board'); // Assuming a board model exists

// Add a task to the To-Do column of a board

exports.addTask = async (req, res) => {
  const { title, description } = req.body;
  const { boardId } = req.params; // Get the boardId from the URL parameters

  try {
    // Check if title and description are provided
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: 'Title and description are required' });
    }

    // Create a new task associated with the board
    const newTask = new Task({
      title,
      description,
      status: 'Todo', // Set default status for new tasks
      boardId, // Associate the task with the specific board
    });

    // Save the new task to the database
    const savedTask = await newTask.save();
    res.status(201).json(savedTask); // Send the saved task as response
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' }); // Send server error response
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
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};