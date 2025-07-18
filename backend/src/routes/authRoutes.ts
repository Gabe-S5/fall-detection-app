import express from "express";
import { login } from "../controllers/authController";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.post("/login", authenticate, login);

export default router;
