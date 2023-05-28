import React, { useEffect, useState } from 'react';
import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";
import { Pagination } from 'react-bootstrap';
import { Modal, Button, Form } from 'react-bootstrap'
import { DeleteOutlined, EditOutlined, UserAddOutlined } from '@ant-design/icons'
import axios from 'axios'
import config from '../../config'
import Header from '../../components/Header'
import Add from './Add'
import { useNavigate } from 'react-router-dom';

const ViewManager = () => {
  const navigate = useNavigate()
  const [apiData, setApiData] = useState([])
  const [search, setSearch] = useState('')

  // Delete dept
  const deleteDepartment = async (id) => {
    const apiData = await axios.delete(`${config.URL}/department/${id}`)
    console.log("Data delete Successfully", apiData)
    departmentDataget()
  }

  // Get all department
  const departmentDataget = async () => {
    const apiResponse = await axios.get(`${config.URL}/department`)
    setApiData(apiResponse.data.response)
    // console.log(apiResponse.data.response, '...............apiResponse.................')
  }

  useEffect(() => {
    departmentDataget()
  }, [])

  //  Table Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsParPage = 4;
  let lastIndex = currentPage * recordsParPage;
  const firstIndex = lastIndex - recordsParPage;
  const records = apiData.slice(firstIndex, lastIndex);
  const noPages = Math.ceil(apiData.length / recordsParPage);
  const numbers = [...Array(noPages + 1).keys()].slice(1);

  function nextPage() {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  }
  function prevPage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  }
  function changeCPage(id) {
    setCurrentPage(id);
  }

  // Search Filter
  const searchFilter = (data) => {
    return data.filter(
      (item) =>
        item.dept_name.toString().toLowerCase().includes(search) ||
        item.dept_id.toString().toLowerCase().includes(search) ||
        item.category_name.toString().toLowerCase().includes(search) ||
        item.location.toString().toLowerCase().includes(search) ||
        item.salary.toString().toLowerCase().includes(search)
    );
  };

  return (
    <>
      <Header />
      <div className="container overflow-hidden">
        <div className="row gy-5">
          <div className="col-5">
            <div className="p-3">
              <button type="button" className="btn btn-primary mb-2"><UserAddOutlined /><Add DepartmentDataget={departmentDataget} /></button>
            </div>
          </div>
          <div className="col-5">
            <div className="p-3">
              <input
                type="search"
                className="form-control"
                placeholder="Type query"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <table className="table align-middle mb-0 bg-white container">
        <thead className="bg-light">
          <tr>
            <th>Id</th>
            <th>Department Name</th>
            <th>Category Name</th>
            <th>Location</th>
            <th>Salary</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            searchFilter(records).map((item, index) => {

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
      </table>
      <nav aria-label="..." className='container mt-2'>
        <MDBPagination circle className="mb-0">
          <MDBPaginationItem>
            <MDBPaginationLink
              href="#"
              tabIndex={-1}
              aria-disabled="true"
              onClick={prevPage}
            >
              Previous
            </MDBPaginationLink>
          </MDBPaginationItem>

          <MDBPaginationItem className="d-flex">
            {numbers.map((n, i) => {
              return (
                <Pagination
                  className={`page-item${currentPage === n ? "active" : ""
                    }`}
                  key={i}
                >
                  <MDBPaginationLink
                    href="#"
                    onClick={() => changeCPage(n)}
                  >
                    {n}
                  </MDBPaginationLink>
                </Pagination>
              );
            })}
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink href="#" onClick={nextPage}>
              Next
            </MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      </nav>
    </>
  )
}

export default ViewManager