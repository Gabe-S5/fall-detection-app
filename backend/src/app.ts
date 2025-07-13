import express from "express";
import cors from "cors";
import incidentRoutes from "./routes/incidentRoutes";

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/incidents", incidentRoutes);

export default app;
