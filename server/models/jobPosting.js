import mongoose from "mongoose";

const JobPosting = mongoose.model(
  "Job Posting",
  new mongoose.Schema(
    {
      title: String,
      description: String,
      location: String,
      salary: Number,
      company: {
        name: String,
        website: String,
      },
    },
    {
      timestamps: true,
    }
  )
);

export default JobPosting;
