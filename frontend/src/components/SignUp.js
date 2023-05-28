import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRadio,
}
  from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import config from '../config';

function SignUp() {
  const navigate = useNavigate()
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
   
    if (apiData.data.status === 200) {
      toast.success("Successfully Register the User")
      navigate('/login')
    }
    else {
      toast.error('Invalid credential')
    }
  }
  return (
    <>
      <div>
        <MDBContainer fluid style={{ width: "90%" }} >

          <MDBRow className='d-flex justify-content-center align-items-center'>
            <MDBCol>

              <MDBCard className='my-1'>

                <MDBRow className='g-0'>

                  <MDBCol md='6' className="d-none d-md-block">
                    <MDBCardImage src='https://merchant.cheefim.com/assets/img/gallery/login.png' alt="Sample photo" className="" height='500vh' width='550vw' />
                  </MDBCol>
                  <MDBCol md='6'>

                    <MDBCardBody className='text-black d-flex flex-column justify-content-center'>
                      <h3 className="mb-4 text-uppercase fw-bold">Sign Up Page</h3>
                      <MDBRow>
                        <MDBCol md='6'>
                          <MDBInput wrapperClass='mb-3' label='First Name' name='firstname' value={signupInfo.firstname} onChange={handleChange} size='lg' id='form1' type='text' />
                        </MDBCol>

                        <MDBCol md='6'>
                          <MDBInput wrapperClass='mb-3' label='Last Name' name='lastname' value={signupInfo.lastname} onChange={handleChange} size='lg' id='form2' type='text' />
                        </MDBCol>

                      </MDBRow>

                      <div className='d-md-flex ustify-content-start align-items-center mb-3'>
                        <h6 className="fw-bold mb-0 me-4">Gender: </h6>
                        <MDBRadio
                          name='gender'
                          id='inlineRadio1'
                          value='female'
                          label='Female'
                          inline
                          checked={signupInfo.gender === 'female'}
                          onChange={handleChange}
                        />
                        <MDBRadio
                          name='gender'
                          id='inlineRadio2'
                          value='male'
                          label='Male'
                          inline
                          checked={signupInfo.gender === 'male'}
                          onChange={handleChange}
                        />
                      </div>

                      <MDBInput wrapperClass='mb-2' label='Email' name='email' value={signupInfo.email} onChange={handleChange} size='lg' id='form5' type='text' />
                      <MDBInput wrapperClass='mb-2' label='Password' name='password' value={signupInfo.password} onChange={handleChange} size='lg' id='form4' type='text' />
                      <MDBInput wrapperClass='mb-2' label='Hobbies' name='hobbies' value={signupInfo.hobbies} onChange={handleChange} size='lg' id='form6' type='text' />

                      <div className="justify-content-end pt-1">
                        <MDBBtn className='ms-2' color='warning' size='lg' onClick={submitData}>Submit</MDBBtn>
                      </div>

                    </MDBCardBody>

                  </MDBCol>
                </MDBRow>

              </MDBCard>

            </MDBCol>
          </MDBRow>

        </MDBContainer>
      </div>
    </>
  );
}


export default SignUp