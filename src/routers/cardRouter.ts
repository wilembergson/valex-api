import { Router } from "express";
import { activateCard, newCard } from "../controllers/cardController.js";
import { employeeValidateMiddleware, passwordValidateMiddleware } from "../middlewares/employeeMiddleware.js";

const cardRouter = Router()

cardRouter.post('/newcard', employeeValidateMiddleware, newCard)
cardRouter.post('/activatecard', passwordValidateMiddleware,activateCard)

export default cardRouter