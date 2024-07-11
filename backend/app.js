const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');

const app = express();

// Set security HTTP headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  max: 100, // limit each IP to 100 requests per windowMs
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api', limiter);

// Data sanitization against XSS
app.use(xss());

// Data sanitization against NoSQL injection
app.use(mongoSanitize());

// Enable CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend domain
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' })); // Body limit is 10

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

module.exports = app;
