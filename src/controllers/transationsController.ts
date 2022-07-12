import { Request, Response } from "express";

import * as transationsService from "../services/transactionsService.js"

export async function newRecharge(req: Request, res: Response){
    const rechargeData = res.locals.rechargeData
    const result = await transationsService.newRecharge(rechargeData.cardId, rechargeData.amount)
    return res.status(200).json(result)
}