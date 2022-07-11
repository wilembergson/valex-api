import { NextFunction, Request, Response } from "express"
import { TransactionTypes } from "../repositories/cardRepository.js"
import * as employeeRepository from "../repositories/employeeRepository.js"
import * as companyRepository from "../repositories/companyRepository.js"
import Error from "../utils/error.js"

export async function employeeValidateMiddleware(req:Request, res: Response, next: NextFunction) {
    const {employeeId, typeCard} = req.body
    const apikey = req.headers.apikey
    
    const company = await companyRepository.findByApiKey(apikey.toString())
    const employee = await employeeRepository.findById(employeeId)
    const cardType: TransactionTypes = typeCard

    if(!company) Error('Não é permitido criar cartões com a respectiva API KEY.', 401)
    if(!employee) Error('ID de usuario não encontrado', 404)
    if(!cardType) Error('Tipo de cartão não permitido', 401)
    res.locals.cardData = {
        employee,
        cardType
    }
    next()
}