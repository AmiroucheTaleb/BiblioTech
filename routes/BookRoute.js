const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware.checkAuth, bookController.addBook);
router.get("/:id", authMiddleware.checkAuth, bookController.getBook);
router.get("/", authMiddleware.checkAuth, bookController.getBooks);
router.put("/:id", authMiddleware.checkAuth, bookController.updateBook);
router.delete("/:id", authMiddleware.checkAuth, bookController.deleteBook);

module.exports = router;
