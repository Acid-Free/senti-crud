import express, { query } from "express";
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
app.get("/edit-job-posting/:id", async (request, response) => {
  try {
    let jobPosting = await fetch(
      `${api}/api/job-postings/${request.params.id}`
    );
    jobPosting = await jobPosting.json();

    return response.render("update-job-posting", { jobPosting });
  } catch (error) {
    return response.status(500).send("500: Internal server error");
  }
});

// Calls API to update specific job posting
app.post("/edit-job-posting/:id", async (request, response) => {
  try {
    await fetch(`${api}/api/job-postings/${request.params.id}`, {
      method: "put",
      body: JSON.stringify({ ...request.body }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return response.status(500).send("500: Internal server error");
  }

  // TODO: create flash message
  return response.redirect("/");
});

// Called by forms when deleting a paricular job posting by id
app.post("/delete-job-posting/:id", (request, response) => {
  // TODO:
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to mongodb");
    app.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch((error) => console.log("mongodb:", error));
