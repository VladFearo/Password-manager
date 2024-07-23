import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import NotFound from '../pages/NotFound.jsx';
import Passwords from '../pages/Passwords.jsx'; // Password Manager
import PrivateRoute from '../components/PrivateRoute.jsx';
import Header from '../components/Header.jsx';

function App() {
  return (

    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/passwords" element={<PrivateRoute><Passwords /></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
