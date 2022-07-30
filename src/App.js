import React, { useState } from 'react';
import './App.css';
import Home from './pages/reminder';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import AppNavbar from './components/AppNavbar';
import ErrorPage from './components/ErrorPage';
import { Container } from 'react-bootstrap';

import { UserProvider } from './UserContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [user, setUser] = useState({
    accessToken: localStorage.getItem('accessToken'),
    email: localStorage.getItem('email'),
    isAdmin: localStorage.getItem('isAdmin')
  })

  //Function for clearing localStorage on logout
  const unsetUser = () => {
        localStorage.clear()
  }

  return (
    <UserProvider value={{user, setUser, unsetUser}}>
      <Router>
        <AppNavbar />
        <Container>
          <Routes>
            < Route path="/" element={ <Home /> }/>
            < Route path="/login" element={ <Login /> }/>
            < Route path="/register" element={ <Register /> }/>        
            < Route path="/logout" element={ <Logout /> }/>
            < Route path="*" element={ <ErrorPage /> }/>
          </Routes>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
