const express = require("express");
const router = express.Router();
const empruntController = require("../controllers/empruntController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware.checkAuth, empruntController.addEmprunt);
router.get("/:id", authMiddleware.checkAuth, empruntController.getEmprunt);
router.put("/:id", authMiddleware.checkAuth, empruntController.returnBook);
router.get("/", authMiddleware.checkAuth, empruntController.getEmprunts);

module.exports = router;
