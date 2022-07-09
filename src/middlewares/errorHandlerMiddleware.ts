import {Request, Response, NextFunction} from "express"

export default function errorHandler (error, req: Request, res: Response, next: NextFunction) {
  console.log(error)
  if (error.response) {
    return res.sendStatus(error.response.status)
  }

  res.status(500).send("Confira a conexão com o banco de dados.")
}