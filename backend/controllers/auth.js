const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log('User already exists');
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
      console.log('Hashed password:', hashedPassword);
  
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
      console.log('User registered:', newUser);
  
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(201).json({ token, user: newUser });
    } catch (err) {
      console.error('Error during registration:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        console.log('User not found');
        return res.status(400).json({ message: 'User not found' });
      }
  
      console.log('Password provided:', password);
      console.log('Hashed password in DB:', existingUser.password);
  
      const isMatch = await bcrypt.compare(password, existingUser.password);
      console.log('Password match result:', isMatch);
  
      if (!isMatch) {
        console.log('Invalid credentials');
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({ token, user: existingUser });
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ message: 'Server error' });
    }
  };
  