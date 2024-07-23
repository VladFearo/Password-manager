const CryptoJS = require('crypto-js');

const MASTER_KEY = process.env.MASTER_KEY;

if (!MASTER_KEY) {
  console.error('MASTER_KEY is not defined');
  throw new Error('Encryption key is not set');
}

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

module.exports = { encryptData, decryptData };
