const express = require('express');
const { register, login } = require('../controllers/auth');
const router = express.Router();

/**
 * Route for user registration.
 * @route POST /register
 * @access Public
 */
router.post('/register', register);

/**
 * Route for user login.
 * @route POST /login
 * @access Public
 */
router.post('/login', login);

// Export the router to be used in other parts of the application
module.exports = router;
