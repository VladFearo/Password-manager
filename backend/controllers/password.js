const { encryptData, decryptData } = require('../utils/encryption');
const Password = require('../models/Password');

exports.addPassword = async (req, res) => {
  const { data } = req.body;

  try {
    const { website, password } = decryptData(data);
    console.log('Decrypted Data:', { website, password });

    const encryptedPassword = encryptData(password);
    console.log('Encrypted Password:', encryptedPassword);

    const newPassword = new Password({
      userId: req.user.id, // This should not be encrypted
      website,
      password: encryptedPassword,
    });

    await newPassword.save();
    res.status(201).json({ message: 'Password added successfully', data: encryptData(newPassword) });
  } catch (err) {
    console.error('Error adding password:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPasswords = async (req, res) => {
  try {
    const passwords = await Password.find({ userId: req.user.id });
    console.log('Retrieved Passwords:', passwords);

    const decryptedPasswords = passwords.map((passwordEntry) => {
      try {
        const decryptedPassword = decryptData(passwordEntry.password);
        console.log('Decrypted Password:', decryptedPassword);
        return {
          ...passwordEntry._doc,
          password: decryptedPassword,
        };
      } catch (error) {
        console.error('Error decrypting password:', error);
        return {
          ...passwordEntry._doc,
          password: 'Decryption failed',
        };
      }
    });

    const encryptedResponse = encryptData(decryptedPasswords);
    console.log('Encrypted Response:', encryptedResponse);
    res.status(200).json({ data: encryptedResponse });
  } catch (err) {
    console.error('Error fetching passwords:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updatePassword = async (req, res) => {
  const { data } = req.body;

  try {
    const { id, website, password } = decryptData(data);
    console.log('Decrypted Data:', { id, website, password });

    const encryptedPassword = encryptData(password);
    console.log('Encrypted Password:', encryptedPassword);

    const updatedPassword = await Password.findByIdAndUpdate(
      id,
      { website, password: encryptedPassword },
      { new: true }
    );

    res.status(200).json({ message: 'Password updated successfully', data: encryptData(updatedPassword) });
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
