import { Router } from "express";
import { newRecharge } from "../controllers/transationsController.js";
import { rechargeValidate } from "../middlewares/transationsMiddleware.js";

const transactionsRouter = Router()

transactionsRouter.post('/newrecharge', rechargeValidate, newRecharge)

export default transactionsRouter