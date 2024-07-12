# Password Manager

## Description

This is a secure password manager built with the MERN stack (MongoDB, Express, React, Node.js) and Vite. It allows users to store, retrieve, update, and delete passwords for different websites. Passwords are stored securely and can be toggled between hidden and visible states for convenience.

## Features

- User Authentication (Register and Login)
- Add new passwords
- Edit existing passwords
- Delete passwords
- Toggle password visibility
- Secure storage with hashed passwords
- CORS configuration for secure cross-origin requests

## Prerequisites

- Node.js and npm installed
- MongoDB instance running

## Installation

### Backend

1. Clone the repository:

   ```bash
   git clone https://github.com/VladFearo/Password-manager
   cd password-manager
   ```

2. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:

   ```env
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. Install frontend dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm run dev
   ```

## Usage

1. Register a new user account.
2. Log in with the registered account.
3. Add, edit, delete, and manage passwords.

## Project Structure

```
password-manager/
│
├── backend/
│   ├── controllers/
│   │   ├── auth.js
│   │   ├── password.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── Password.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── password.js
│   ├── app.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── PrivateRoute.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── Passwords.jsx
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   └── passwordService.js
│   │   ├── styles/
│   │   │   └── Passwords.css
│   │   ├── App.jsx
│   │   ├── main.jsx
│   ├── public/
│   ├── index.html
│   └── package.json
```

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Log in a user

### Passwords

- `POST /api/password/add`: Add a new password
- `GET /api/password/all`: Get all passwords for the logged-in user
- `PUT /api/password/update`: Update an existing password
- `DELETE /api/password/delete/:id`: Delete a password by ID

## Environment Variables

The following environment variables need to be set in the `.env` file for the backend:

- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation

## Contributing

Feel free to fork this project and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
