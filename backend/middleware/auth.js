const jwt = require('jsonwebtoken');

/**
 * Middleware to verify JWT token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
module.exports = (req, res, next) => {
  // Get token from the Authorization header and remove 'Bearer ' prefix
  const token = req.header('Authorization').replace('Bearer ', '');
  
  // If no token is provided, return an authorization denied response
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token using the secret key and attach the decoded token to the request object
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    // If token verification fails, return an invalid token response
    res.status(401).json({ message: 'Token is not valid' });
  }
};
