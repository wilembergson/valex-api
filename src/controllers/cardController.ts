import { Request, Response } from "express";
import * as cardService from "../services/cardService.js"

export async function newCard(req:Request, res: Response) {
    const cardData = await res.locals.cardData
    const employee = await cardData.employee
    const cardType = await cardData.cardType
    const newCard = await cardService.newCard(employee, cardType)
    return res.status(201).json(newCard)
}

export async function activateCard(req:Request, res: Response){
    const activateCardData = await res.locals.activateCardData
    const cardId = await activateCardData.cardId
    const securityCode = await activateCardData.securityCode
    const password = await activateCardData.password
    const card = await cardService.activateCard(cardId,securityCode, password)
    return res.status(200).send(card)
}

export async function blockCard(req:Request, res: Response){
    const {cardId, password} = req.body
    const compare = await cardService.blockCard(cardId, password)
    return res.status(200).json(compare)
}
export async function unlockCard(req:Request, res: Response){
    const {cardId, password} = req.body
    const compare = await cardService.unlockCard(cardId, password)
    return res.status(200).json(compare)
}