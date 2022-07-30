import React, { useState, useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavbar() {

    const { user } = useContext(UserContext);

    //State to store the user information stored in the login page
    //localStorage.getItem() is used to get the object saved/stored in the localStorage
    // const [user, setUser] = useState(localStorage.getItem("email"));
    // console.log(user)

    return (
        <Navbar bg="dark" expand="lg" variant="dark" className="mb-5">
            <Navbar.Brand href="#home" className="ms-2">NAVBAR BRAND</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={ Link } to="/">Home</Nav.Link>

                { (user.accessToken !== null) ?
                    <Nav.Link as={ Link } to="/logout">Logout</Nav.Link>
                    :
                    <>
                        <Nav.Link as={ Link } to="/login">Login</Nav.Link>
                        <Nav.Link as={ Link } to="/register">Register</Nav.Link>
                    </>
                 }
              </Nav>
            </Navbar.Collapse>
        </Navbar>

    )
}



