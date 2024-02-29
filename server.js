require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/users');
const messageRoutes = require('./routes/messages');
const User = require('./models/User');


const app = express();
const port = 3000; // Explicitly setting the port to 3000

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(bodyParser.json()); // Parse JSON bodies

// MongoDB Connection - Ensure your MONGODB_URI is set in your .env file
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

// Simple route for testing the server
app.get('/', (req, res) => {
  res.send('Hello World from Guitar Lessons Scheduling App!');
});

// Server listening on port 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
