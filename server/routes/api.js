import express from "express";

const router = express.Router();

router.get("/hello", (request, response) => {
  console.log("this is get hello");

  const data = {
    message: "Hello from the server!",
  };

  response.json(data);
});

export default router;
