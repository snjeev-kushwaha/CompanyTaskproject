import React, { useState } from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput
}
  from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
import config from '../config';

const Login = () => {
  const navigate = useNavigate()
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value })
  }

  const submitData = async (e) => {
    e.preventDefault();
    const headers = {
      'Content-Type': 'application/json'
    }
    const apiData = await axios.post(`${config.URL}/login`, loginInfo, headers)
   
    if (apiData.data.status === 200) {
      localStorage.setItem("token", apiData.data.token)
      localStorage.setItem("userData", JSON.stringify(apiData.data.user))
      switch (apiData?.data?.user?.rolename) {
        case "manager":
          navigate('/view')
          break;
        case "employee":
          navigate('/employeelistbyid')
          break;
      }
      toast.success("Successfully Login")
    } else {
      toast.error('Invalid Password')
    }
  }

  return (
    <MDBContainer fluid className="p-3 my-5" style={{ width: "80%" }}>

      <MDBRow>

        <MDBCol col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid" alt="Phone image" />
        </MDBCol>

        <MDBCol col='4' md='6'>


          <MDBInput wrapperClass='mb-4' label='Email address' name='email' value={loginInfo.email} onChange={handleChange} id='formControlLg' type='email' size="lg" />
          <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' name='password' value={loginInfo.password} onChange={handleChange} type='password' size="lg" />


          <div className="d-flex justify-content-between mx-4 mb-4">
            {/* <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='' /> */}
            <Link to='/register' style={{textDecoration: "none"}}>SignUp</Link>
          </div>

          <MDBBtn className="mb-4 w-100" size="lg" onClick={submitData}>Sign in</MDBBtn>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Login;