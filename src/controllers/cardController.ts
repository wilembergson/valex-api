import { Request, Response } from "express";
import * as cardService from "../services/cardService.js"

export async function newCard(req:Request, res: Response) {
    const employee = await res.locals.employee
    console.log(await employee)
    const newCard = await cardService.newCard(employee)
    return res.send(newCard)
}