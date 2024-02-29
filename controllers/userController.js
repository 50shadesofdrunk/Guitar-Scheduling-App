const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Adjust the path as necessary to match your project structure

// User registration function
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12); // Hashing the password
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Storing the hashed password
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// User login function
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
      // Passwords match
      // Here you would typically create a session or generate a token
      // For simplicity, we'll just return a success message
      res.status(200).json({ message: 'Login successful' });
    } else {
      // Either the user was not found or the password didn't match
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};
