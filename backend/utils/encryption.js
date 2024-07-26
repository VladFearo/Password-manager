const CryptoJS = require('crypto-js');

// Retrieve the master encryption key from environment variables
const MASTER_KEY = process.env.MASTER_KEY;

// Check if the master key is defined, if not, log an error and throw an exception
if (!MASTER_KEY) {
  console.error('MASTER_KEY is not defined');
  throw new Error('Encryption key is not set');
}

/**
 * Encrypts the given data using AES encryption with the master key.
 * @param {Object} data - The data to be encrypted.
 * @returns {string} - The encrypted data as a string.
 * @throws {Error} - If encryption fails.
 */
const encryptData = (data) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), MASTER_KEY).toString();
    console.log('Encrypted Data:', encrypted); // Debugging log
    return encrypted;
  } catch (error) {
    console.error('Error encrypting data:', error);
    throw new Error('Encryption failed');
  }
};

/**
 * Decrypts the given encrypted data using AES decryption with the master key.
 * @param {string} encryptedData - The data to be decrypted.
 * @returns {Object} - The decrypted data.
 * @throws {Error} - If decryption fails.
 */
const decryptData = (encryptedData) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, MASTER_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    console.log('Decrypted Data:', decrypted); // Debugging log
    return JSON.parse(decrypted);
  } catch (error) {
    console.error('Error decrypting data:', error);
    throw new Error('Decryption failed');
  }
};

// Export the encryptData and decryptData functions
module.exports = { encryptData, decryptData };
