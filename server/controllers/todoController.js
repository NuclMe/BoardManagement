const Todo = require('../models/Todo');

exports.addTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newTodo = new Todo({
      title,
      description,
      status: status || 'Todo',
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const { status } = req.query;

    const todos = status
      ? await Todo.find({ status })
      : await Todo.find({ status: 'Todo' });

    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.editTodo = async (req, res) => {
  const { id } = req.params;
  const { name, description, status } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      { name, description, status },
      { new: true }
    );
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
