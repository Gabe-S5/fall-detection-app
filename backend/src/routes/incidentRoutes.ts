import express from "express";
import { createIncident, getIncidents, summarizeIncident } from "../controllers/incidentController";
import { authenticate } from "../middleware/auth";

const router = express.Router();

router.post("/", authenticate, createIncident);
router.get("/", authenticate, getIncidents);
router.post("/:id/summarize", authenticate, summarizeIncident);

export default router;
