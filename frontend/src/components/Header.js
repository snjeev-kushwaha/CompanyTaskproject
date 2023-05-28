import React from 'react'
import { Navbar, Container, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    const logOut = () => {
        localStorage.clear()
        navigate('/')
    }

    return (
        <div>
            <Navbar>
                <Container>
                    <Navbar.Brand href="#home">CompanyTask</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            {localStorage.getItem('token') ? (<Button onClick={logOut} style={{ textDecoration: "none" }}>Logout</Button>) : (<Link to='/login' style={{ textDecoration: "none" }}>Login</Link>)}


                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header