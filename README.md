# Secure Password Manager

## Overview

The Secure Password Manager is a web-based application designed to securely store and manage user passwords. Built with the MERN stack (MongoDB, Express.js, React, Node.js) and Vite for a fast front-end development experience, this project ensures high security and ease of use for managing sensitive information.

## Features

- **User Registration and Authentication**: Secure user registration and login with JWT-based authentication.
- **Password Management**: Add, retrieve, update, and delete passwords securely.
- **Encryption**: All sensitive data, including passwords and JWT tokens, are encrypted using CryptoJS.
- **Secure Communication**: Ensures secure communication between the front-end and back-end using encrypted messages.
- **User-Friendly Interface**: Intuitive and seamless user interface for managing passwords.
- **Secure Password Generator**: Generate strong, unique passwords resistant to common attacks.
- **Error Handling and Logging**: Robust error handling and logging for reliability and maintenance.

## Technologies Used

- **Front-end**: React with Vite
- **Back-end**: Node.js, Express.js
- **Database**: MongoDB
- **Security**: CryptoJS for encryption, JWT for authentication

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/VladFearo/Password-manager.git
   cd Password-manager
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

### Running Tests

To run the tests for the backend, navigate to the `backend` directory and run:
```bash
npm test
```

## Project Structure

### Backend

- `app.js`: Main application setup.
- `server.js`: Server configuration and startup.
- `testSetup.js`: Setup for tests.
- `controllers/`: Contains the business logic for authentication and password management.
- `middleware/`: Middleware for authentication.
- `models/`: Mongoose schemas for User and Password.
- `routes/`: Route handlers for authentication and password management.
- `test/`: Unit tests for the backend.
- `utils/`: Utility functions, including encryption.

### Frontend

- `components/`: Reusable React components.
- `pages/`: React components representing different pages.
- `services/`: Services for handling API requests.
- `src/`: Main entry point for the React application.
- `styles/`: CSS files for styling components.



---

