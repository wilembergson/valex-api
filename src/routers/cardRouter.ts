import { Router } from "express";
import { newCard } from "../controllers/cardController.js";
import { employeeValidateMiddleware } from "../middlewares/employeeMiddleware.js";

const cardRouter = Router()

cardRouter.get('/newcard', employeeValidateMiddleware, newCard)

export default cardRouter