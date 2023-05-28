const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, "sanjeev", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }

    // Token is valid, you can access the decoded data if needed
    req.user = decoded;
    next();
  });
};

module.exports = { verifyToken };
