import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import NotFound from '../pages/NotFound.jsx';
import Passwords from '../pages/Passwords.jsx'; // Password Manager
import PrivateRoute from '../components/PrivateRoute.jsx';
import Header from '../components/Header.jsx';

/**
 * App component that sets up the main routing for the application.
 *
 * @component
 */
function App() {
  return (
    <BrowserRouter>
      <Header /> {/* Render the header component */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Route for the home page */}
        <Route path="/login" element={<Login />} /> {/* Route for the login page */}
        <Route path="/register" element={<Register />} /> {/* Route for the register page */}
        <Route path="/passwords" element={<PrivateRoute><Passwords /></PrivateRoute>} /> {/* Protected route for the passwords page */}
        <Route path="*" element={<NotFound />} /> {/* Route for handling 404 Not Found */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
