const Password = require('../models/Password');

exports.addPassword = async (req, res) => {
  const { website, password } = req.body;

  try {
    const newPassword = new Password({
      userId: req.user.id,
      website,
      password,
    });

    await newPassword.save();
    res.status(201).json({ message: 'Password added successfully', newPassword });
  } catch (err) {
    console.error('Error adding password:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPasswords = async (req, res) => {
  try {
    const passwords = await Password.find({ userId: req.user.id });
    res.status(200).json(passwords);
  } catch (err) {
    console.error('Error fetching passwords:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updatePassword = async (req, res) => {
  const { id, website, password } = req.body;

  try {
    const updatedPassword = await Password.findByIdAndUpdate(
      id,
      { website, password },
      { new: true }
    );

    res.status(200).json({ message: 'Password updated successfully', updatedPassword });
  } catch (err) {
    console.error('Error updating password:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deletePassword = async (req, res) => {
  const { id } = req.params;

  try {
    await Password.findByIdAndDelete(id);
    res.status(200).json({ message: 'Password deleted successfully' });
  } catch (err) {
    console.error('Error deleting password:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
