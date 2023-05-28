import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import config from "../../config";

const Add = ({ DepartmentDataget }) => {
  const [empinfo, setEmpInfo] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [deptInfo, setDeptInfo] = useState({
    dept_name: "",
    category_name: "",
    location: "",
    salary: "",
    emp_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDeptInfo({ ...deptInfo, [name]: value });
  };

  const submitData = async (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    const apiData = await axios.post(
      `${config.URL}/department`,
      deptInfo,
      headers
    );
    console.log(apiData, "api data");
    setDeptInfo({
      dept_name: "",
      category_name: "",
      location: "",
      salary: "",
      emp_id: "",
    });
    DepartmentDataget();
    handleClose();
  };

  const getEmployeeData = async () => {
    const apiData = await axios.get(`${config.URL}/employee`);
    setEmpInfo(apiData.data.response, "apiData");
  };
  useEffect(() => {
    getEmployeeData();
  }, []);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
                <option value="ipangram">Ipangram</option>
                <option value="facebook">Facebook</option>
                <option value="wipro">Wipro</option>
                <option value="wallmart">Wallmart</option>
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
                <option value="hr">HR</option>
                <option value="it">IT</option>
                <option value="sales">Sales</option>
                <option value="marketing">Marketing</option>
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
            <Form.Group className="mb-3">
              <Form.Label>Empi Id</Form.Label>
              <Form.Select
                aria-label="Default select example"
                type="text"
                placeholder="Enter emp_id"
                name="emp_id"
                value={deptInfo.emp_id}
                onChange={handleChange}
              >
                <option>Select Emp_Id</option>
                {empinfo.map((item, index) => (
                  <option key={index} value={item.emp_id}>
                    {item.emp_id}
                  </option>
                ))}
              </Form.Select>
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
  );
};

export default Add;
