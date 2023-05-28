import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'
import { DeleteOutlined, EditOutlined, UserAddOutlined } from '@ant-design/icons'
import axios from 'axios'
import config from '../../config'
import Header from '../../components/Header'
import Add from './Add'
import { useNavigate } from 'react-router-dom';

const ViewManager = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [apiData, setApiData] = useState([])

  const [roleid, setRoleId] = useState('')
  const [emp_id, setEmpId] = useState('')
  const [roleSelectApiData, setRoleSelectApiData] = useState([])
  const [roleApiData, setRoleApiData] = useState([])

  const [viewRoleshow, setViewRoleshow] = useState(false);

  const handleClose1 = () => setViewRoleshow(false);
  const handleShow1 = () => setViewRoleshow(true);

  const modalEmpid = (emp_id) => {
    handleShow();
    setEmpId(emp_id)
  }

  // Delete dept
  const deleteDepartment = async (id) => {
    const apiData = await axios.delete(`${config.URL}/department/${id}`)
    console.log("Data delete Successfully", apiData)
    departmentDataget()
  }

  // Delete Role
  const deleteRole = async (roleid) => {
    const apiData = await axios.delete(`${config.URL}/deletemprole/${roleid}`)
    console.log("Data delete Successfully", apiData)
    departmentDataget()
    handleClose1()
  }

// show all role
  const RoleSelectdataShow = async (emp_id) => {
    const apiResponse = await axios.get(`${config.URL}/viewselectrole/${emp_id}`)
    setRoleSelectApiData(apiResponse.data.response)
    handleShow1();
    // console.log(apiResponse.data.response, '...............apiResponse.................')
  }

  // post Role assign 
  const submitRoleAssign = async (e) => {
    e.preventDefault();
    const config = {
      "Content-Type": 'application/json'
    }
    const dataRole = { roleid, emp_id }

    const apiData = await axios.post(`http://localhost:4000/api/v1/roleassign`, dataRole, config)
    console.log(apiData, "submitdata")
    handleClose()
    setRoleId("")
    setEmpId("")
  }


// Get all department
  const departmentDataget = async () => {
    const apiResponse = await axios.get(`${config.URL}/department`)
    setApiData(apiResponse.data.response)
    // console.log(apiResponse.data.response, '...............apiResponse.................')
  }

  // Get all role
  const RoleDataget = async () => {
    const apiResponse = await axios.get(`${config.URL}/viewrole`)
    setRoleApiData(apiResponse.data.response)
    // console.log(apiResponse.data.response, '...............apiResponse.................')
  }

  useEffect(() => {
    departmentDataget()
    RoleDataget()
  }, [])


  return (
    <>
      <Header />
      <button type="button" className="btn btn-primary mb-2" style={{ marginLeft: "30px" }}><UserAddOutlined /><Add DepartmentDataget={departmentDataget} /></button>
      <table className="table align-middle mb-0 bg-white">
        <thead className="bg-light">
          <tr>
            <th>Id</th>
            <th>Department Name</th>
            <th>Category Name</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Action</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            apiData.map((item, index) => {

              return (
                <tr key={index}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{item.dept_id}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{item.dept_name}</p>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{item.category_name}</p>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{item.location}</p>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{item.salary}</p>
                  </td>
                  <td>
                    <button type="button" className="btn btn-primary" onClick={() => {
                      RoleSelectdataShow(item.emp_id)
                    }}>View</button>&nbsp;
                    <button type="button" className="btn btn-primary" onClick={() => modalEmpid(item.emp_id)}>Assign Dept</button>
                  </td>
                  <td>
                    <button type="button" className="btn btn-primary" onClick={() => navigate('/edit', { state: { data: item } })}><EditOutlined /></button>
                  </td>
                  <td>
                    <button type="button" className="btn btn-primary" onClick={() => deleteDepartment(item.dept_id
                    )}><DeleteOutlined /></button>
                  </td>
                </tr>

              )
            })
          }

        </tbody>

        <Modal show={viewRoleshow} onHide={handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title>View Role</Modal.Title>
          </Modal.Header>
          <Modal.Body>{roleSelectApiData.map((item, index) => {
            return (
              <div key={index}>
                <div className="d-flex" ><p>{item.rolename}</p>
                <Button onClick={() => deleteRole(item.roleid)} style={{marginLeft:"75%"}}><DeleteOutlined /></Button></div>
              </div>
            )
          })}</Modal.Body>
        </Modal>


        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>  <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Empid</Form.Label>
              <Form.Control type="text" placeholder="Enter empid" name="emp_id"
                value={emp_id}
                onChange={(e) => setEmpId(e.target.value)} />
            </Form.Group>
            <Form.Select
              aria-label="Default select example"
              value={roleid}
              onChange={(e) => setRoleId(e.target.value)}
            >
              <option>Select Role</option>
              {roleApiData.map((item, index) => (
                <option key={index} value={item.roleid}>
                  {item.roleid}&nbsp;&nbsp;{item.rolename}
                </option>
              ))}
            </Form.Select>
            <Button variant="primary" type="submit" onClick={submitRoleAssign}>
              Submit
            </Button>
          </Form>
          </Modal.Body>
        </Modal>
      </table>

    </>
  )
}

export default ViewManager