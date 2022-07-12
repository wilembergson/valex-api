import { Router } from "express";
import { activateCard, getBalanceAndTansactions, newCard } from "../controllers/cardController.js";
import { checkCard, employeeValidateMiddleware, passwordValidateMiddleware } from "../middlewares/employeeMiddleware.js";

const cardRouter = Router()

cardRouter.post('/newcard', employeeValidateMiddleware, newCard)
cardRouter.post('/activatecard', passwordValidateMiddleware,activateCard)
cardRouter.get('/transactions', checkCard,getBalanceAndTansactions)

export default cardRouter