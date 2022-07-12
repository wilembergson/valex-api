import { Request, Response } from "express";

import * as transationsService from "../services/transactionsService.js"

export async function newRecharge(req: Request, res: Response){
    const rechargeData = res.locals.rechargeData
    const result = await transationsService.newRecharge(rechargeData.cardId, rechargeData.amount)
    return res.status(200).json(result)
}

export async function newBuy(req: Request, res: Response){
    const buyData = res.locals.buyData
    const result = await transationsService.newBuy(buyData.cardId, buyData.password, buyData.businessId, buyData.amount)
    return res.status(201).json(result)
}