import express from "express";
import mongoose from "mongoose";

import JobPosting from "../models/jobPosting.js";

const router = express.Router();

// Get all job postings
router.get("/", (request, response) => {
  // TODO:
  response.send("this is job posting index");
});

// Get specific job posting by id
router.get("/:id", (request, response) => {
  // TODO:
});

// Add new job posting
router.post("/", async (request, response) => {
  try {
    const jobPosting = await JobPosting.create(request.body);
    response.status(200).json(jobPosting);
  } catch (error) {
    response.status(500).json({ message: error.message });
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
