const { connection } = require("../configs/dbConnection");
const uuid = require("uuid").v4;
const getData = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const sqlQuery = `SELECT * FROM department LIMIT ${limit} OFFSET ${offset}`;
    await connection.query(sqlQuery, (err, result) => {
      if (err) {
        return res.send({
          status: 400,
          error: "Failed to fetch data from the database.",
        });
      }

      res.send({ status: 200, response: result });
    });
  } catch (err) {
    res.send({
      status: 400,
      error: "An error occurred while processing the request.",
    });
  }
};

const postData = async (req, res) => {
  try {
    const min = 1000000; // Minimum 7-digit value
    const max = 9999999; // Maximum 7-digit value

    const randomId = Math.floor(Math.random() * (max - min + 1) + min);
    const dept_id = randomId.toString();
    const data = {
      dept_id: dept_id,
      dept_name: req.body.dept_name,
      category_name: req.body.category_name,
      location: req.body.location,
      salary: req.body.salary,
      emp_id: req.body.emp_id,
    };

    const sqlQuery = `INSERT INTO department SET ?`;
    await connection.query(sqlQuery, data, (err, result) => {
      if (err) {
        return res.send({ status: 400, Error: err.message });
      }
      res.send({ status: 200, response: result });
    });
  } catch (err) {
    res.send({ status: 400, Error: err.message });
  }
};

const updateData = async (req, res) => {
  try {
    const dept_id = req.params.dept_id;
    const data = req.body;

    const sqlQuery = `UPDATE department SET ? WHERE dept_id =${dept_id}`;
    await connection.query(sqlQuery, data, (err, result) => {
      if (err) {
        return res.send({ status: 400, Error: err.message });
      }
      res.send({ status: 200, response: result });
    });
  } catch (err) {
    res.send({ status: 400, Error: err.message });
  }
};

const deleteData = async (req, res) => {
  try {
    const dept_id = req.params.dept_id;
    console.log(dept_id)
    const sqlQuery = `DELETE FROM department WHERE dept_id =${dept_id}`;
    await connection.query(sqlQuery, (err, result) => {
      if (err) {
        return res.send({ status: 400, Error: err.message });
      }
      res.send({ status: 200, response: result });
    });
  } catch (err) {
    res.send({ status: 400, Error: err.message });
  }
};

module.exports = { getData, postData, updateData, deleteData };
