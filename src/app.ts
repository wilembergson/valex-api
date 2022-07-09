import cors from "cors";
import express, { json } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandlerMiddleware.js";
dotenv.config();

const app = express();
app.use(json());
app.use(cors());
app.use(errorHandler);

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Running on port ${port}...`);
});