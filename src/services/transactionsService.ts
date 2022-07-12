import { checkActive, checkBlocked, checkExpirationDate, checkPassWord, getCard } from "./cardService.js";
import * as rechargesRepository from "../repositories/rechargeRepository.js"
import * as paymentRepository from "../repositories/paymentRepository.js"
import * as businessRepository from "../repositories/businessRepository.js"
import Error from "../utils/error.js";

export async function newRecharge(cardId: number, amount: number){
    const card = await getCard(cardId)
    const recharge: rechargesRepository.RechargeInsertData = {cardId, amount}
    await rechargesRepository.insert(recharge)
    return { message: 'Recarga realizada com sucesso.' }
}

export async function newBuy(cardId:number, password: number, businessId:number, amount:number){
    const card = await getCard(cardId)
    await checkPassWord(card.password, password.toString())
    await checkExpirationDate(card.expirationDate)
    await checkBlocked(card.isBlocked)
    await checkBusiness(businessId, card.type)
    await checkBalanceAndBuyAmount(amount, cardId)
    await paymentRepository.insert({cardId, amount, businessId})
    return {
        message: "Compra realizada com sucesso.",
        total: amount
    }
}

async function checkBusiness(businessesId: number, cardType: string){
    const business = await businessRepository.findById(businessesId)
    if(!business) Error("ID do estabelecimento não existente.", 404)
    if(business.type !== cardType) Error("O cartão não pode ser utilizado neste estabelecimento. Tipo diferente.", 401)
}
async function checkBalanceAndBuyAmount(amount: number, cardId: number){
    const balance = await getBalance(cardId)
    if(amount > balance) Error("Saldo insulficiente.", 401)
}
async function getBalance(cardId: number) {
    const payments = await paymentRepository.findByCardId(cardId)
    const recharges = await rechargesRepository.findByCardId(cardId)
    const paymentsSum = await getAmount(payments)
    const rechargesSum = await getAmount(recharges)
    const balance = rechargesSum - paymentsSum
    return balance
}

async function getAmount(list:any[]) {
    let sum: number = 0
    list.forEach(element => sum += element.amount)
    return sum
}

export async function listTransactions(cardId: number){
    const balance = await getBalance(cardId)
    const transactions = await paymentRepository.findByCardId(cardId)
    const recharges = await rechargesRepository.findByCardId(cardId)
    const result = {
        balance,
        transactions,
        recharges
    }
    return result
}