const { encryptData, decryptData } = require('../utils/encryption');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { data } = req.body;
  const { name, email, password } = decryptData(data);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const encryptedResponse = encryptData({ token, user: newUser });
    res.status(201).json({ data: encryptedResponse });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { data } = req.body;
  const { email, password } = decryptData(data);

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const encryptedResponse = encryptData({ token, user: existingUser });
    res.status(200).json({ data: encryptedResponse });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
