const express = require('express')

const employeeRoute = express.Router()
const { signUp, login, addRole, roleAssign, viewRole, viewSelectRole, viewEmployee, deleteRole } = require('../controllers/employeeController')
const { validate } = require('../validation/employeeValidation')

employeeRoute.get('/viewrole', viewRole)
employeeRoute.get('/viewselectrole/:emp_id', viewSelectRole)
employeeRoute.delete('/deletemprole/:roleid', deleteRole)
employeeRoute.post('/roleassign', roleAssign)
employeeRoute.post('/addrole', addRole)
employeeRoute.post('/register', validate, signUp)
employeeRoute.post('/login', login)
employeeRoute.get('/employee', viewEmployee)

module.exports = { employeeRoute }