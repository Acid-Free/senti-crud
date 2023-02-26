import mongoose from "mongoose";

const JobPosting = mongoose.model(
  "Job Posting",
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: [true, "You need to provide the job title."],
      },
      description: {
        type: String,
        required: [true, "You need to provide the job description."],
      },
      location: {
        type: String,
        required: [true, "You need to provide the job location."],
      },
      salary: {
        type: String,
        required: [true, "You need to provide a salary description."],
      },
      company: {
        name: {
          type: String,
          required: [true, "You need to provide the company name"],
        },
        website: { type: String, required: false },
      },
    },
    {
      timestamps: true,
    }
  )
);

export default JobPosting;
