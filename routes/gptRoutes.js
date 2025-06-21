import express from "express";
import { recommendMovies } from "../controllers/gptController.js";

const router = express.Router();

router.post("/recommend", recommendMovies);

export default router;
