const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())

const { departmentRoute } = require('./routes/departmentRoute')
const { employeeRoute } = require('./routes/employeeRoute')

app.use('/api/v1', departmentRoute)
app.use('/api/v1', employeeRoute)

app.listen(process.env.PORT, (err) => {
    console.log(`Server is started on http://localhost:${process.env.PORT}`)
})