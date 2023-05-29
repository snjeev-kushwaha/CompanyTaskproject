import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './auth/Login'
import SignUp from './auth/SignUp'
import Header from './components/Header'
import Add from './pages/department/Add'
import View from './pages/department/View'
import EmployeelistById from './pages/employee/EmployeelistById'
import Edit from './pages/department/Edit';
import Protected from './auth/Protected';
import ViewEmployee from './pages/employee/ViewEmployee'

function App() {
  const location = useLocation()
  return (
    <div className="App">
      <ToastContainer autoClose={2000} />
      {
        location.pathname === '/' ? (<Login />) : (
          <Routes>
            <Route path='/' element={<Protected Component={Header} />} />
            <Route path='/register' element={<SignUp />} />
            <Route path='/add' element={<Protected Component={Add} />} />
            <Route path='/edit' element={<Protected Component={Edit} />} />
            <Route path='/view' element={<Protected Component={View} />} />
            <Route path='/employeelist' element={<Protected Component={EmployeelistById} />} />
            <Route path='/viewemployee' element={<Protected Component={ViewEmployee} />} />
          </Routes>
        )
      }

    </div>
  );
}

export default App;