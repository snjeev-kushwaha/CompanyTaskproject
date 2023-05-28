import React from 'react'
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    const logOut = () => {
        localStorage.clear()
        navigate('/')
    }

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#">Company Task</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        {localStorage.getItem('token') ? (
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Nav.Link href="/employeelist">Employee List</Nav.Link>
                                <Nav.Link href="/viewemployee">View Employee</Nav.Link>
                                <Nav.Link href="/view">View Department</Nav.Link>
                            </Nav>
                        ) : (<Link to='/login' style={{ textDecoration: "none" }}>Login</Link>)}
                        {localStorage.getItem('token') ? (<Button onClick={logOut} style={{ textDecoration: "none" }}>Logout</Button>) :
                            (<Link to='/login' style={{ textDecoration: "none" }}>Login</Link>)}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    )
}

export default Header