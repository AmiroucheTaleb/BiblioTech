import express from "express";
import { auth } from "../middleware/auth.js";
import { getlecteurHistory } from "../controllers/bookController.js";

export const lecteurRoute = express.Router();

lecteurRoute.get("/stats", auth(["lecteur"]), getlecteurHistory);
