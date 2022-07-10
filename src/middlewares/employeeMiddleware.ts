import { NextFunction, Request, Response } from "express";
import * as employeeRepository from "../repositories/employeeRepository.js"

export async function employeeValidateMiddleware(req:Request, res: Response, next: NextFunction) {
    const {employeeId} = req.body
    const employee = employeeRepository.findById(employeeId)
    
    if(!employee){
        return  {message: "ID de funcionario inexistente."}
    }
    res.locals.employee = employee
    next()
}