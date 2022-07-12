import { NextFunction, Request, Response } from "express";
import Error from "../utils/error.js";
import { rechargeSchema } from "../utils/schemas.js";

export async function rechargeValidate(req:Request, res: Response, next: NextFunction){
    const {cardId, amount} = req.body
    const {error} = rechargeSchema.validate({cardId, amount})
    if(error) Error('Algum campo deve está está vazio. AMOUNT deve ser maior que zero.', 422)
    res.locals.rechargeData = {cardId, amount}
    next()
}