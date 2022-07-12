import { Router } from "express";
import { activateCard,  newCard, unlockCard } from "../controllers/cardController.js";
import { checkCard, employeeValidateMiddleware, passwordValidateMiddleware } from "../middlewares/cardMiddleware.js";
import { blockCard } from "../controllers/cardController.js";

const cardRouter = Router()

cardRouter.post('/newcard', employeeValidateMiddleware, newCard)
cardRouter.post('/activatecard', passwordValidateMiddleware,activateCard)
cardRouter.put('/blockcard', blockCard)
cardRouter.put('/unlockcard', unlockCard)

export default cardRouter