const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes'); // Importing todo routes
const boardRoutes = require('./routes/boardRoutes'); // Importing board routes

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON data

// Routes
app.use('/api/tasks', taskRoutes); // Route for tasks
app.use('/api/boards', boardRoutes); // Route for boards

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
