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

// Default route
app.get("/", async (request, response) => {
  try {
    let jobPostings = await fetch(`${api}/api/job-postings`);
    jobPostings = await jobPostings.json();

    return response.status(200).render("index", { jobPostings });
  } catch (error) {
    return response.status(500).send("500: Internal server error");
  }
});

// Called by forms when editing a particular job posting by id
// Render another page for editing job posting info
app.get("/edit-job-postings/:id", async (request, response) => {
  try {
    let jobPostings = await fetch(
      `${api}/api/job-postings/${request.params.id}`
    );
    jobPostings = await jobPostings.json();

    return response.render("update-job-postings", { jobPostings });
  } catch (error) {
    return response.status(500).send("500: Internal server error");
  }
});

app.post("/edit-job-postings/:id", async (request, response) => {
  // TODO:
});

// Called by forms when deleting a paricular job posting by id
app.post("/delete-job-postings/:id", (request, response) => {
  // TODO:
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to mongodb");
    app.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch((error) => console.log("mongodb:", error));
