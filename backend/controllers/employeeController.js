const { connection } = require("../configs/dbConnection");
const bcrypt = require("bcryptjs");
const uuid = require("uuid").v4;
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const { firstname, lastname, gender, hobbies, email, password } = req.body;
    const min = 1000000; // Minimum 7-digit value
    const max = 9999999; // Maximum 7-digit value

    const randomId = Math.floor(Math.random() * (max - min + 1) + min);
    const emp_id = randomId.toString();
    const hashedPassword = bcrypt.hashSync(password, 10);
    const data = {
      emp_id: emp_id,
      firstname,
      lastname,
      email,
      gender,
      hobbies,
      password: hashedPassword,
    };
    const sql = "INSERT INTO employee SET ?";
    await connection.query(sql, data, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while signing up." });
      } else {
        res.status(201).json({ message: "Signup successful.", results });
      }
    });
  } catch (err) {
    res.send(err.message);
  }
};

let login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const sqlQuery = `SELECT r.rolename,e.password, e.firstname,e.lastname,e.email,e.gender,e.hobbies FROM employee e JOIN role_assign ra ON e.emp_id = ra.emp_id JOIN role r ON ra.roleid = r.roleid WHERE e.email = ?`;
    await connection.query(sqlQuery, email, async (err, result) => {
    
      if (err) {
        return res.json({ status: 400, response: err.sqlMessage });
      }
      const dbPassword = result[0] ? result[0].password : "";
      // const dbPassword = result[0].password;
      const passwordCheck = await bcrypt.compare(password, dbPassword);

      if (passwordCheck === false) {
        return res.json({ status: 400, response: "InCorrect password" });
      }
      let token;
      if (result[0].rolename === "manager") {
        token = await jwt.sign(
          { emp_id: result[0].emp_id, rolename: result[0].rolename },
          process.env.SECRET_KEY
        );
      } else if(result[0].rolename === "employee") {
        token = await jwt.sign(
          { emp_id: result[0].emp_id, rolename: result[0].rolename },
          process.env.SECRET_KEY
        );
      }

      res.json({
        status: 200,
        response: "logged in Successfully",
        token,
        user: result[0],
      });
    });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};
// -----------------------------role---------------



const viewRole = async (req, res) => {
  try {
    const sqlQuery = "SELECT * FROM role";
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

const viewSelectRole = async (req, res) => {
  try {
    const Id = req.params.emp_id
    const sqlQuery = `SELECT roleid,rolename FROM role NATURAL JOIN role_assign Where emp_id=?`;
    await connection.query(sqlQuery, [Id], (err, result) => {
      if (err) {
        return res.send({ status: 400, Error: err.message });
      }
      res.send({ status: 200, response: result });
    });
  } catch (err) {
    res.send({ status: 400, Error: err.message });
  }
};


const addRole = async (req, res) => {
  try {
    const min = 1000000; // Minimum 7-digit value
    const max = 9999999; // Maximum 7-digit value

    const randomId = Math.floor(Math.random() * (max - min + 1) + min);
    const roleid = randomId.toString();
    const data = {
      roleid: roleid,
      rolename: req.body.rolename,
    };
    console.log("data", data);
    const sqlQuery = "INSERT INTO role SET ?";
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

const roleAssign = async (req, res) => {
  try {
    const data = req.body;
    const sqlQuery = "INSERT INTO role_assign SET ?";
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

const viewEmployee = async (req, res) => {
  try {
    const sqlQuery = `SELECT * FROM employee`;
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

const deleteRole = async (req, res) => {
  try {
    const roleid = req.params.roleid;
   
    const sqlQuery = `DELETE FROM role_assign WHERE roleid =${roleid}`;
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

module.exports = { signUp, login, addRole, roleAssign, viewRole, viewSelectRole, viewEmployee, deleteRole };
