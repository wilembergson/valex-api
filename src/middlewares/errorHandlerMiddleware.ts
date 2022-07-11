import {Request, Response, NextFunction} from "express"

export default function errorHandler (error, req: Request, res: Response, next: NextFunction) {
  return res.status(error.status).json({message: error.message})
}