/**
 * This script initializes the server and connects to MongoDB.
 *
 * @file server.js
 * @authors Vladyslav Shevtsov and Lior Shilon
 * @version 1.0.0
 */

require('dotenv').config(); // Load environment variables from .env file
const app = require('./app'); // Import the Express app
const mongoose = require('mongoose'); // Import Mongoose for MongoDB interaction

/**
 * The port number where the server will listen.
 * Defaults to 5000 if not specified in the environment variables.
 *
 * @constant {number} PORT
 */
const PORT = process.env.PORT || 5000;

/**
 * The MongoDB connection URI.
 * Must be specified in the environment variables.
 *
 * @constant {string} MONGO_URI
 */
const MONGO_URI = process.env.MONGO_URI;

/**
 * Connects to MongoDB using the provided URI.
 * Logs a success message upon successful connection.
 * Starts the server on the specified port.
 * Logs an error message upon failure to connect to MongoDB.
 */
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB')) // Log success message upon connection
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`); // Start the server and log the port number
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err); // Log error message upon failure to connect
  });
