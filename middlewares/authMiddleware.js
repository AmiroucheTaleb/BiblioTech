const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const { JWT_SECRET } = process.env;

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.slice(7, authHeader.length);
    const decodedToken = jwt.verify(token, JWT_SECRET);

    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await UserModel.findById(decodedToken.userId);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = authMiddleware;
