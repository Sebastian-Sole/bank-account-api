import env from "./env";
import express from "express";
import cors from "cors";

const app = express();
const port = env.PORT;

app.use(cors());

app.post("/", async (req, res) => {
  res.status(200).send("Hello World");
});

app.listen(port, () => {
  console.log(`️🚀 [server]: Server is running at http://localhost:${port}`);
});
