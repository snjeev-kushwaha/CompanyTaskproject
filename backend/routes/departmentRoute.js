const express = require("express");

const departmentRoute = express.Router();

const {
  getData,
  postData,
  updateData,
  deleteData,
} = require("../controllers/departmentController");
const { verifyToken } = require('../middleware/verifytoken')
const { validate } = require("../validation/departmentValidation");

departmentRoute.get("/department", getData);
departmentRoute.post("/department", validate, verifyToken, postData);
departmentRoute.put("/department/:dept_id", updateData);
departmentRoute.delete("/department/:dept_id", deleteData);

module.exports = { departmentRoute };
