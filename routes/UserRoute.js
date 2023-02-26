const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/:id", authMiddleware.checkAuth, userController.getUser);
router.get("/", authMiddleware.checkAuth, userController.getUsers);
router.put("/:id", authMiddleware.checkAuth, userController.updateUser);
router.delete("/:id", authMiddleware.checkAuth, userController.deleteUser);

module.exports = router;
