import { NextFunction, Request, Response } from "express"

import { TransactionTypes } from "../repositories/cardRepository.js"
import * as employeeRepository from "../repositories/employeeRepository.js"
import * as cardRepository from "../repositories/cardRepository.js"

import Error from "../utils/error.js"
import { activateCardSchema } from "../utils/schemas.js"
import apiKeyValidate from "../utils/apiKeyValidate.js"

export async function employeeValidateMiddleware(req:Request, res: Response, next: NextFunction) {
    const {employeeId, typeCard} = req.body
    const apikey = req.headers.apikey
    if(apikey===undefined) Error('API KEY não está sendo inserida.', 401)
    await apiKeyValidate(apikey.toString())
    const employee = await employeeRepository.findById(employeeId)
    const cardType: TransactionTypes = typeCard

    if(!employee) Error('ID de usuario não encontrado', 404)
    if(!cardType) Error('Tipo de cartão não permitido', 401)
    res.locals.cardData = {
        employee,
        cardType
    }
    next()
}

export async function passwordValidateMiddleware(req:Request, res: Response, next: NextFunction){
    const {cardId,securityCode, password} = req.body
    const {error} = activateCardSchema.validate({cardId, securityCode, password})
    if(error) throw Error("Preencha as infotmações com dados numéricos.", 422)
    res.locals.activateCardData = {
        cardId,
        securityCode,
        password
    }
    next()
}

export async function checkCard(req:Request, res: Response, next: NextFunction){
    const {cardId} = req.body
    const card = await cardRepository.findById(cardId)
    if(!card) Error(`Cartão com ID ${cardId} inexistente.`, 404)
    next()
}