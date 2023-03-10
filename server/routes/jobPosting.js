import express from "express";

import JobPosting from "../models/jobPosting.js";

const router = express.Router();

const nonexistentError = { status: 404, message: "Object doesn't exist" };

function sendError(error, response) {
  // checks if status key exists, 500 otherwise
  const status = error?.status ?? 500;
  console.log("status:", status);
  response.status(status).json({ message: error.message });
}

function sendSuccess(resultObject, response, statusCode) {
  const status = statusCode ?? 200;
  response.status(status).json(resultObject);
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

    // Send error if empty result
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
    return sendSuccess(jobPosting, response, 201);
  } catch (error) {
    return sendError(error, response);
  }
});

// Update specific job posting by id
router.put("/:id", async (request, response) => {
  try {
    const jobPosting = await JobPosting.findByIdAndUpdate(
      request.params.id,
      request.body
    );

    // Send error if empty result
    if (!jobPosting) {
      return sendError(nonexistentError, response);
    }

    const updatedJobPosting = await JobPosting.findById(request.params.id);

    return sendSuccess(updatedJobPosting, response);
  } catch (error) {
    return sendError(error, response);
  }
});

// Delete specific job posting by id
router.delete("/:id", async (request, response) => {
  try {
    const jobPosting = await JobPosting.findByIdAndDelete(request.params.id);

    if (!jobPosting) {
      return sendError(nonexistentError, response);
    }

    return sendSuccess({ message: "Object deleted" }, response, 204);
  } catch (error) {
    return sendError(error, response);
  }
});

// Get job posting count
router.get("/get/count", async (request, response) => {
  try {
    const jobPosting = await JobPosting.countDocuments();

    return sendSuccess(jobPosting, response);
  } catch (error) {
    return sendError(error, response);
  }
});

export default router;
