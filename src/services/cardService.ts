import {faker} from "@faker-js/faker"
import { CardInsertData } from "../repositories/cardRepository.js"
import * as employeeRepository from "../repositories/employeeRepository.js"

export async function newCard(employee: any){
    const number = faker.finance.creditCardNumber()
    const cardholderName = formatName(employee.fullName)
    const expirationDate = formatExpirationDate()
    
    const card:any = {
        employeeId: employee.id,
        number: number,
        cardholderName: cardholderName,
        //securityCode,
        expirationDate,
        //password,
        //isVirtual,
        //originalCardId,
        //isBlocked,
        //type
    }
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