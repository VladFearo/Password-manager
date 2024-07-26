const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema for storing user information
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // The name of the user, must be provided
  },
  email: {
    type: String,
    required: true, // The email of the user, must be provided
    unique: true, // The email must be unique
  },
  password: {
    type: String,
    required: true, // The hashed password, must be provided
  },
});

// Export the User model based on the schema
module.exports = mongoose.model('User', UserSchema);
