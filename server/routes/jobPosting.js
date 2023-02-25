import express from "express";

import JobPosting from "../models/jobPosting.js";

const router = express.Router();

const nonexistentError = { message: "Object doesn't exist" };

function sendError(error, response) {
  response.status(500).json({ message: error.message });
}

function sendSuccess(resultObject, response) {
  response.status(200).json(resultObject);
}

// Get all job postings
router.get("/", async (request, response) => {
  try {
    const jobPosting = await JobPosting.find({});
    return sendSuccess(jobPosting, response);
  } catch (error) {
    return sendError(error, response);
  }
});

// Get specific job posting by id
router.get("/:id", async (request, response) => {
  try {
    const jobPosting = await JobPosting.findById(request.params.id);

    // send error if empty result
    if (!jobPosting) {
      return sendError(nonexistentError, response);
    }

    return sendSuccess(jobPosting, response);
  } catch (error) {
    return sendError(error, response);
  }
});

// Add new job posting
router.post("/", async (request, response) => {
  try {
    const jobPosting = await JobPosting.create(request.body);
    return sendSuccess(jobPosting, response);
  } catch (error) {
    return sendError(error, response);
  }
});

// Update specific job posting by id
router.put("/:id", (request, response) => {
  // TODO:
});

// Delete specific job posting by id
router.delete("/:id", (request, response) => {
  // TODO:
});

// Get job posting count
router.get("/count", (request, response) => {
  // TODO:
});

export default router;
