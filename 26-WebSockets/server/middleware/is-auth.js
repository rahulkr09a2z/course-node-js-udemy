const jwt = require("jsonwebtoken");

const User = require("../models/user");

const SECRET = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  function notAuthHandler() {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }
  if (!authHeader) {
    notAuthHandler();
  }
  const token = req.get("Authorization").split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, SECRET);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    notAuthHandler();
  }
  const user = await User.findById(decodedToken.userId);
  if (!user) {
    const error = new Error("User Not Found");
    error.statusCode = 404;
    throw error;
  }

  req.userId = decodedToken.userId;
  next();
};
