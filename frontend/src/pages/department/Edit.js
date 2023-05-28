import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import config from "../../config";
import { useNavigate, useLocation } from "react-router-dom";

const Edit = () => {
    const navigate = useNavigate();
    const locations = useLocation();
    const data = locations.state.data;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [deptInfo, setDeptInfo] = useState({
        dept_id: data.dept_id,
        dept_name: data.dept_name,
        category_name: data.category_name,
        location: data.location,
        salary: data.salary,
    });

    const { dept_id, dept_name, category_name, location, salary } = deptInfo;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDeptInfo({ ...deptInfo, [name]: value });
    };

    const submitData = async (e) => {
        e.preventDefault();
        const headers = {
            "Content-Type": "application/json",
        };
        const apiData = await axios.put(
            `${config.URL}/department/${dept_id}`,
            deptInfo,
            headers
        );
        console.log(apiData, "api data");
        navigate('/view')
        handleClose();
    };

    useEffect(() => {
        handleShow();
    }, []);

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Dept Id</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter DeptId"
                                name="dept_id"
                                value={deptInfo.dept_id}
                                onChange={handleChange}
                                disabled
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Dept Name</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                name="dept_name"
                                value={deptInfo.dept_name}
                                onChange={handleChange}
                            >
                                <option>Select Department Name</option>
                                <option
                                    value="Google IT soln pvt name"
                                >
                                    Google IT soln pvt name
                                </option>
                                <option value="Ppangram">Ipangram</option>
                                <option value="Facebook">Facebook</option>
                                <option value="Wipro">Wipro</option>
                                <option value="Wallmart">Wallmart</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Category Name</Form.Label>
                            <Form.Select
                                aria-label="Default select example"
                                name="category_name"
                                value={deptInfo.category_name}
                                onChange={handleChange}
                            >
                                <option>Select Category Name</option>
                                <option value="Hr">HR</option>
                                <option value="It">IT</option>
                                <option value="Sales">Sales</option>
                                <option value="Marketing">Marketing</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter location"
                                name="location"
                                value={deptInfo.location}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>salary</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Phone Number"
                                name="salary"
                                value={deptInfo.salary}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={submitData}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Edit;
