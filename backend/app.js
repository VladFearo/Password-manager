const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');

const app = express();

// Set security HTTP headers
app.use(helmet());

// Rate limiting to prevent abuse
const limiter = rateLimit({
  max: 100, // Limit each IP to 100 requests per windowMs
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: 'Too many requests from this IP, please try again later.' // Message to send when rate limit is exceeded
});
app.use('/api', limiter); // Apply the rate limiting to API routes

// Data sanitization against XSS attacks
app.use(xss());

// Data sanitization against NoSQL injection attacks
app.use(mongoSanitize());

// Enable CORS with specific options
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend domain
  optionsSuccessStatus: 200 // Status to send for successful OPTIONS requests
};
app.use(cors(corsOptions));

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' })); // Body limit is 10kb

// Routes
const authRoutes = require('./routes/auth'); // Authentication routes
const passwordRoutes = require('./routes/password'); // Password management routes
app.use('/api/auth', authRoutes); // Use authentication routes
app.use('/api/password', passwordRoutes); // Use password management routes

// Export the app to be used in other parts of the application
module.exports = app;
