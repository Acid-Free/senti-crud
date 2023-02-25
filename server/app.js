import express from "express";
import apiRouter from "./routes/api.js";

const app = express();

// Allow serving of static files to client
app.use(express.static("client"));

// API endpoints defined in apiRouter are prefixed with /api
app.use("/api", apiRouter);
