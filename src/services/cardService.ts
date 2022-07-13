import { faker } from "@faker-js/faker";
import Cryptr from "cryptr"
import bcrypt from 'bcrypt';
import dotenv from "dotenv";
dotenv.config();

import { CardInsertData, TransactionTypes } from "../repositories/cardRepository.js"
import * as cardRepository from "../repositories/cardRepository.js"
import * as employeeRepository from "../repositories/employeeRepository.js"
import Error from "../utils/error.js";

const cryptrSecret = process.env.CRYPTR_SECRET
const CRYPTR = new Cryptr(cryptrSecret)

export async function newCard(employee: employeeRepository.Employee, type: TransactionTypes){
    await checkCardWithSameType(type, employee.id)

    const number = faker.finance.creditCardNumber()
    const cardholderName = formatName(employee.fullName)
    const expirationDate = formatExpirationDate()
    const cvvGenerate = faker.finance.creditCardCVV()
    const cvv = CRYPTR.encrypt(cvvGenerate)
    
    const card:CardInsertData = {
        employeeId: employee.id,
        number: number,
        cardholderName: cardholderName,
        securityCode: cvv,
        expirationDate,
        password: undefined,
        isVirtual: true,
        originalCardId: undefined,
        isBlocked: false,
        type: type
    }
    await cardRepository.insert(card)
    card.securityCode = cvvGenerate
    return card
}

function formatName(name: string): string{
    const nameArray = name.split(' ')
    const firstName = nameArray[0]
    const lastName = nameArray[nameArray.length-1]
    let middleNameInitials = ''

    if(nameArray.length > 2){ 
        for(let i=1; i<nameArray.length-1; i++){
            if(nameArray[i].length>2){
                middleNameInitials += `${nameArray[i][0]} `
            }
        }
    }
    const formatedName = `${firstName} ${middleNameInitials.trim()} ${lastName}`

    return formatedName.toUpperCase()
}

function formatExpirationDate():string{
    const yearData = new Date().getUTCFullYear() + 5;
    const monthdata = new Date().getUTCMonth() + 1;

    const month = (monthdata < 10) ? `0${monthdata}` : `${monthdata}`
    const yyyy = yearData.toString()
    const year = `${yyyy[2]}${yyyy[3]}`
    return `${month}/${year}`;
}

async function checkCardWithSameType(type: TransactionTypes, employeeId: number) {
  const result = await cardRepository.findByTypeAndEmployeeId(type, employeeId)
  if(result) Error(`Este funcionário já tem um cartão do tipo ${type}.`, 422)
}

export async function activateCard(cardId:number,securityCode:number, password: number){
    const card = await getCard(cardId)
    await checkPasswordLength(password)
    await checkActive(card.password)
    await checkCVV(card.securityCode, securityCode.toString())
    await checkExpirationDate(card.expirationDate)
    const cryptPassword = bcrypt.hashSync(password.toString(), 10)
    card.password = cryptPassword
    const cardUpdated: cardRepository.CardUpdateData = card
    return await cardRepository.update(card.id, cardUpdated)
}

export async function getCard(id:number) {
    const card = await cardRepository.findById(id)
    if(!card) throw Error("ID do cartão informado inexistente.", 404)
    return card
}

async function checkCVV(encrySecurityCode:string, securityCode:string){
    console.log(CRYPTR.decrypt(encrySecurityCode))
    if(CRYPTR.decrypt(encrySecurityCode) !== securityCode) throw Error("Codígo de segurança não confere com o cartão.", 401)
}

export async function checkActive(password:string) {
    if(password) throw Error("Este cartão já está ativado.", 401)    
}

export async function checkExpirationDate(date:string){
    const dateArray = date.split("/")
    const expirationMonth = parseInt(dateArray[0])
    const expirationYear = parseInt(dateArray[1])
    const currentYear = new Date().getUTCFullYear() - 2000;
    const currentMonth = new Date().getUTCMonth() + 1;
    if(currentMonth > expirationMonth && currentYear >= expirationYear){
        throw Error("Este cartão expirou.",401)
    }
}

async function checkPasswordLength(password: number){ 
    if(password.toString().length !== 4) throw Error("A senha deve ter 4 digitos.", 422)
}

export async function blockCard(cardId: number, password: number){
    const card = await getCard(cardId)
    await checkPassWord(card.password, password.toString())
    await checkBlocked(card.isBlocked)
    await checkExpirationDate(card.expirationDate)
    card.isBlocked = true
    await cardRepository.update(card.id, card)
    return {message:'Cartão bloqueado com sucesso.'}
}

export async function unlockCard(cardId: number, password: number){
    const card = await getCard(cardId)
    await checkPassWord(card.password, password.toString())
    await checkUnlocked(card.isBlocked)
    await checkExpirationDate(card.expirationDate)
    card.isBlocked = false
    await cardRepository.update(card.id, card)
    return {message:'Cartão desbloqueado com sucesso.'}
}

export async function checkPassWord(hashPassword: string, password: string){
    if(!hashPassword) Error('Este cartão ainda não foi ativado.', 401)
    const compare =  bcrypt.compareSync(password, hashPassword)
    if(!compare) Error('Senha incompatível com o cartão.', 401)
}

export async function checkBlocked(isBlocked: boolean){
    if(isBlocked) Error("Este cartão está bloqueado.", 401)
}
async function checkUnlocked(isBlocked: boolean){
    if(!isBlocked) Error("Este cartão já está desbloqueado.", 401)
}