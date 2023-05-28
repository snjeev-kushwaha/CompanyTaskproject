import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Header from './components/Header'
import Add from './pages/department/Add'
import View from './pages/department/View'
import EmployeelistById from './pages/employee/EmployeelistById'
import Edit from './pages/department/Edit';

function App() {
  const location = useLocation()
  return (
    <div className="App">
      <ToastContainer autoClose={2000} />
      {
        location.pathname === '/' ? (<Login />) : (
          <Routes>
            <Route path='/' element={<Header />} />
            <Route path='/register' element={<SignUp />} />
            <Route path='/add' element={<Add />} />
            <Route path='/edit' element={<Edit />} />
            <Route path='/view' element={<View />} />
            <Route path='/employeelistbyid' element={<EmployeelistById />} />
          </Routes>
        )
      }

    </div>
  );
}

export default App;