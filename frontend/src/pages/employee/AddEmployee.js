import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios'
import config from '../../config';

const AddEmployee = ({ displayEmployee }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [signupInfo, setSignupInfo] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        gender: '',
        hobbies: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo({ ...signupInfo, [name]: value })
    }

    const submitData = async (e) => {
        e.preventDefault()
        const headers = {
            'Content-Type': 'application/json'
        }
        const apiData = await axios.post(`${config.URL}/register`, signupInfo, headers)
        console.log(apiData, 'api data')
        displayEmployee()
        handleClose()
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicFirstname">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter firstname" name='firstname' value={signupInfo.firstname} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicLastname">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter lastname" name='lastname' value={signupInfo.lastname} onChange={handleChange} />
                        </Form.Group>

                        <Form.Check
                            name='gender'
                            id='inlineRadio1'
                            value='female'
                            label='Female'
                            inline
                            checked={signupInfo.gender === 'female'}
                            onChange={handleChange}
                        />
                        <Form.Check
                            name='gender'
                            id='inlineRadio2'
                            value='male'
                            label='Male'
                            inline
                            checked={signupInfo.gender === 'male'}
                            onChange={handleChange}
                        />

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Enter email" name='email' value={signupInfo.email} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name='password' value={signupInfo.password} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicHobbies">
                            <Form.Label>Hobbies</Form.Label>
                            <Form.Control type="text" placeholder="Enter hobbies" name='hobbies' value={signupInfo.hobbies} onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={submitData}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddEmployee