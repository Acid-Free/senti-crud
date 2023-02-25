import express, { application } from "express";
import jobPostingRoute from "./jobPosting.js";

const router = express.Router();

router.use("/job-postings", jobPostingRoute);

router.get("/hello", (request, response) => {
  const data = {
    message: "Hello from the server!",
  };

  response.json(data);
});

export default router;
