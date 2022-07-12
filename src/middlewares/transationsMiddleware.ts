import { NextFunction, Request, Response } from "express";
import apiKeyValidate from "../utils/apiKeyValidate.js";
import Error from "../utils/error.js";
import { rechargeSchema } from "../utils/schemas.js";

export async function rechargeValidate(req:Request, res: Response, next: NextFunction){
    const {cardId, amount} = req.body
    const apikey = req.headers.apikey
    if(apikey===undefined) Error('API KEY não está sendo inserida.', 401)

    await apiKeyValidate(apikey.toString())
    const {error} = rechargeSchema.validate({cardId, amount})
    if(error) Error('Algum campo deve está está vazio. AMOUNT deve ser maior que zero.', 422)
    res.locals.rechargeData = {cardId, amount}
    next()
}