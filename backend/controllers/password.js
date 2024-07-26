const { encryptData, decryptData } = require('../utils/encryption');
const Password = require('../models/Password');

/**
 * Add a new password.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.addPassword = async (req, res) => {
  const { data } = req.body; // Extract encrypted data from the request body

  try {
    const { website, password } = decryptData(data); // Decrypt the incoming data
    console.log('Decrypted Data:', { website, password });

    const encryptedPassword = encryptData(password); // Encrypt the password
    console.log('Encrypted Password:', encryptedPassword);

    const newPassword = new Password({
      userId: req.user.id, // This should not be encrypted
      website,
      password: encryptedPassword,
    });

    await newPassword.save(); // Save the new password to the database
    res.status(201).json({ message: 'Password added successfully', data: encryptData(newPassword) }); // Encrypt and send the response data
  } catch (err) {
    console.error('Error adding password:', err);
    res.status(500).json({ message: 'Server error' }); // Handle errors
  }
};

/**
 * Retrieve all passwords for the logged-in user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.getPasswords = async (req, res) => {
  try {
    const passwords = await Password.find({ userId: req.user.id }); // Retrieve passwords from the database
    console.log('Retrieved Passwords:', passwords);

    const decryptedPasswords = passwords.map((passwordEntry) => {
      try {
        const decryptedPassword = decryptData(passwordEntry.password); // Decrypt each password
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

    const encryptedResponse = encryptData(decryptedPasswords); // Encrypt the response data
    console.log('Encrypted Response:', encryptedResponse);
    res.status(200).json({ data: encryptedResponse }); // Send the encrypted response data
  } catch (err) {
    console.error('Error fetching passwords:', err);
    res.status(500).json({ message: 'Server error' }); // Handle errors
  }
};

/**
 * Update an existing password.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.updatePassword = async (req, res) => {
  const { data } = req.body; // Extract encrypted data from the request body

  try {
    const { id, website, password } = decryptData(data); // Decrypt the incoming data
    console.log('Decrypted Data:', { id, website, password });

    const encryptedPassword = encryptData(password); // Encrypt the password
    console.log('Encrypted Password:', encryptedPassword);

    const updatedPassword = await Password.findByIdAndUpdate(
      id,
      { website, password: encryptedPassword },
      { new: true }
    ); // Update the password in the database

    res.status(200).json({ message: 'Password updated successfully', data: encryptData(updatedPassword) }); // Encrypt and send the response data
  } catch (err) {
    console.error('Error updating password:', err);
    res.status(500).json({ message: 'Server error' }); // Handle errors
  }
};

/**
 * Delete an existing password.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
exports.deletePassword = async (req, res) => {
  const { id } = req.params; // Extract the password ID from the request parameters

  try {
    await Password.findByIdAndDelete(id); // Delete the password from the database
    res.status(200).json({ message: 'Password deleted successfully' }); // Send a success response
  } catch (err) {
    console.error('Error deleting password:', err);
    res.status(500).json({ message: 'Server error' }); // Handle errors
  }
};
