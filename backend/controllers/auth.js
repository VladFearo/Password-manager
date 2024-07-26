const { encryptData, decryptData } = require('../utils/encryption');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Register a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.register = async (req, res) => {
  const { data } = req.body;
  const { name, email, password } = decryptData(data); // Decrypt the incoming data

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' }); // Check if user already exists
    }

    const hashedPassword = await bcrypt.hash(password, 12); // Hash the password

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save(); // Save the new user to the database

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generate a JWT

    const encryptedResponse = encryptData({ token, user: newUser }); // Encrypt the response data
    res.status(201).json({ data: encryptedResponse }); // Send the response
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Server error' }); // Handle errors
  }
};

/**
 * Login an existing user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.login = async (req, res) => {
  const { data } = req.body;
  const { email, password } = decryptData(data); // Decrypt the incoming data

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: 'User not found' }); // Check if user exists
    }

    const isMatch = await bcrypt.compare(password, existingUser.password); // Compare the password

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' }); // Invalid password
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generate a JWT

    const encryptedResponse = encryptData({ token, user: existingUser }); // Encrypt the response data
    res.status(200).json({ data: encryptedResponse }); // Send the response
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Server error' }); // Handle errors
  }
};
