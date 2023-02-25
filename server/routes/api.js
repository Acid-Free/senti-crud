import express from "express";

const router = express.Router();

router.get("/hello", (request, response) => {
  const data = {
    message: "Hello from the server!",
  };

  response.json(data);
});

export default router;
