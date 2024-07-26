const mongoose = require('mongoose');

// Define the schema for storing passwords
const PasswordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // The ID of the user to whom the password belongs, must be provided
  },
  website: {
    type: String,
    required: true, // The website associated with the password, must be provided
  },
  password: {
    type: String,
    required: true, // The encrypted password, must be provided
  },
});

// Export the Password model based on the schema
module.exports = mongoose.model('Password', PasswordSchema);
