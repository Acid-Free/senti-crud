import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import apiRouter from "./routes/api.js";

// use .env by default
dotenv.config();

// disable strictQuery to suppress warning
mongoose.set("strictQuery", false);

const port = process.env.PORT || 5500;

const app = express();

const api = process.env.API_URL;

// Use ejs as templating engine
app.set("view engine", "ejs");
app.set("views", "./client/views/");

// Serve the static files in the client directory
app.use(express.static("client"));

// read JSON
app.use(express.json());
// read forms
app.use(express.urlencoded({ extended: false }));

// API endpoints defined in apiRouter are prefixed with /api
app.use("/api", apiRouter);

app.get("/", async (request, response) => {
  const query = await fetch(`${api}/api/hello`);
  const message = await query.json();

  response.render("index", message);
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to mongodb");
    app.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch((error) => console.log("mongodb:", error));
