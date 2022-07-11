import {faker} from "@faker-js/faker"
import Cryptr from "cryptr"
import dotenv from "dotenv";
dotenv.config();

import { CardInsertData, TransactionTypes } from "../repositories/cardRepository.js"
import * as cardRepository from "../repositories/cardRepository.js"
import * as employeeRepository from "../repositories/employeeRepository.js"

const cryptrSecret = process.env.CRYPTR_SECRET
const CRYPTR = new Cryptr(cryptrSecret)

export async function newCard(employee: employeeRepository.Employee, type: TransactionTypes){
    const number = faker.finance.creditCardNumber()
    const cardholderName = formatName(employee.fullName)
    const expirationDate = formatExpirationDate()
    const cvv = CRYPTR.encrypt(faker.finance.creditCardCVV())
    
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
    return await cardRepository.insert(card)
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