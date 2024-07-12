const express = require('express');
const { addPassword, getPasswords, updatePassword, deletePassword } = require('../controllers/password');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.post('/add', authMiddleware, addPassword);
router.get('/all', authMiddleware, getPasswords);
router.put('/update', authMiddleware, updatePassword);
router.delete('/delete/:id', authMiddleware, deletePassword);

module.exports = router;
