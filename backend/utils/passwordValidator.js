// utils/passwordValidator.js
const zxcvbn = require('zxcvbn');

const validatePasswordStrength = (password) => {
  const result = zxcvbn(password);  // Get password strength score using zxcvbn
  return result.score >= 3;  // Return true if the password is strong enough (score 3 or higher)
};

module.exports = validatePasswordStrength;
