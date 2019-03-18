import { Request, Response } from 'express'
import DomainService from '../services/domain'

/* API Controllers */
export const getDomainValues = async (req: Request, res: Response) => {
  try {
    const allValues = DomainService.getallFixVal()
    res.json(allValues)
  } catch (err) {
    console.log(err)
    res.status(500)
    res.send(err)
  }
}
