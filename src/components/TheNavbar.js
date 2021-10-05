import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from "react-bootstrap/Nav"

export default function TheNavbar(props) {
    return(
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">

            <Navbar.Brand href="#home">
                <img
                    alt=""
                    src="/public/images/favicon.ico"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                CRMS
            </Navbar.Brand>
            <Nav>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            </Nav>

            <Nav>
                <Nav.Link href="/contacts">Contacts</Nav.Link>
            </Nav>

            <Nav>
                <Nav.Link href="/logout" >Logout</Nav.Link>
            </Nav>

        </Navbar>
    )
}