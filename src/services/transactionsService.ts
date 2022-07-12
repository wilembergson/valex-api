import { getCard } from "./cardService.js";
import * as rechargesRepository from "../repositories/rechargeRepository.js"

export async function newRecharge(cardId: number, amount: number){
    const card = await getCard(cardId)
    const recharge: rechargesRepository.RechargeInsertData = {cardId, amount}
    await rechargesRepository.insert(recharge)
    return { message: 'Recarga realizada com sucesso.' }
}