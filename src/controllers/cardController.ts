import { Request, Response } from "express";
import * as cardService from "../services/cardService.js"

export async function newCard(req:Request, res: Response) {
    const cardData = await res.locals.cardData
    const employee = await cardData.employee
    const cardType = await cardData.cardType
    
    const newCard = await cardService.newCard(employee, cardType)
    return res.status(201).send(newCard)
}