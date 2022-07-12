import * as companyRepository from "../repositories/companyRepository.js"
import Error from "./error.js"

export default async function apiKeyValidate(apikey: string){
    const company = await companyRepository.findByApiKey(apikey)
    if(!company) Error('API KEY inválida.', 401)
}