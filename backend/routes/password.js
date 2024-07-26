const express = require('express');
const { addPassword, getPasswords, updatePassword, deletePassword } = require('../controllers/password');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

/**
 * Route to add a new password.
 * @route POST /add
 * @access Private
 */
router.post('/add', authMiddleware, addPassword);

/**
 * Route to get all passwords for the logged-in user.
 * @route GET /all
 * @access Private
 */
router.get('/all', authMiddleware, getPasswords);

/**
 * Route to update an existing password.
 * @route PUT /update
 * @access Private
 */
router.put('/update', authMiddleware, updatePassword);

/**
 * Route to delete an existing password.
 * @route DELETE /delete/:id
 * @access Private
 */
router.delete('/delete/:id', authMiddleware, deletePassword);

// Export the router to be used in other parts of the application
module.exports = router;
