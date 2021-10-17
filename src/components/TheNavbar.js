import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from "react-bootstrap/Nav"

export default function TheNavbar(props) {
    return(
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
            <div style = {{  marginLeft: "1%"}}></div>
            <Navbar.Brand href="#home">
                <img
                    alt=""
                    src="../images/favicon.ico"
                    width="40"
                    height="40"
                    className="d-inline-block align-top"
                    style = {{marginLeft:"26%"}}
                />{'    '}
                <h3>CRMS</h3>
            </Navbar.Brand>
            <div style = {{  marginLeft: "5%"}}></div>
            <Nav>
                <Nav.Link href="/dashboard"><h5>Dashboard</h5></Nav.Link>
            </Nav>

            <Nav>
                <Nav.Link href="/invitation"><h5>Invitation</h5></Nav.Link>
            </Nav>

            <Nav>
                <Nav.Link href="/contacts"><h5>Contacts</h5></Nav.Link>
            </Nav>

            <Nav>
                <Nav.Link href="/profile"><h5>Profile</h5></Nav.Link>
            </Nav>

            <Nav>
                <Nav.Link href="/logout" ><h5>Logout</h5></Nav.Link>
            </Nav>
            
        </Navbar>
    )
}