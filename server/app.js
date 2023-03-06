import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
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

    // Convert every job posting description to dom elements
    /* eslint-disable no-param-reassign */
    jobPostings.forEach((jobPosting) => {
      try {
        const parsedDescription = JSON.parse(jobPosting.description);
        const converter = new QuillDeltaToHtmlConverter(
          parsedDescription.ops,
          {}
        );

        jobPosting.description = converter.convert();
      } catch (error) {
        console.error(error);
        // If error, jobPostings.description cannot be parsed to html
        // Since the model accepts String, add this as a stopgap
      }
    });

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
app.post("/delete-job-posting/:id", async (request, response) => {
  try {
    await fetch(`${api}/api/job-postings/${request.params.id}`, {
      method: "delete",
    });
  } catch (error) {
    return response.status(500).send("500: Internal server error");
  }

  return response.redirect("/");
});

// Call API to create job posting
app.post("/create-job-posting", async (request, response) => {
  try {
    await fetch(`${api}/api/job-postings`, {
      method: "post",
      body: JSON.stringify({ ...request.body }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // TODO: add flash message
    return response.status(500).send(error);
  }

  return response.redirect("/");
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to mongodb");
    app.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch((error) => console.log("mongodb:", error));

export default app;
