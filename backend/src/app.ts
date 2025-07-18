import express from "express";
import cors from "cors";
import incidentRoutes from "./routes/incidentRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/incidents", incidentRoutes);
app.use("/auth", authRoutes);

export default app;
