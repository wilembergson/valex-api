import { Router } from "express";
import { listTransactions, newBuy, newRecharge } from "../controllers/transationsController.js";
import { buyValidate, rechargeValidate } from "../middlewares/transationsMiddleware.js";

const transactionsRouter = Router()

transactionsRouter.post('/newrecharge', rechargeValidate, newRecharge)
transactionsRouter.post('/newbuy', buyValidate, newBuy)
transactionsRouter.get('/list-transactions', listTransactions)

export default transactionsRouter