import { Router } from "express";
import { newBuy, newRecharge } from "../controllers/transationsController.js";
import { buyValidate, rechargeValidate } from "../middlewares/transationsMiddleware.js";

const transactionsRouter = Router()

transactionsRouter.post('/newrecharge', rechargeValidate, newRecharge)
transactionsRouter.post('/newbuy', buyValidate, newBuy)

export default transactionsRouter