import cors from "cors";
import express, { json } from "express";
import "express-async-errors";

import cardRouter from "./routers/cardRouter.js";
import errorHandler from "./middlewares/errorHandlerMiddleware.js";

import dotenv from "dotenv";
import transactionsRouter from "./routers/transationsRouter.js";
dotenv.config();

const app = express();
app.use(json());
app.use(cors());

app.use(cardRouter)
app.use(transactionsRouter)
app.use(errorHandler);

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Running on port ${port}...`);
});
