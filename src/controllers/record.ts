import { Request, Response } from 'express'
import RecService from '../services/rec'

export const getRecData = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const packages = await RecService.getRecdata(id)
    res.json(packages)
  } catch (err) {
    // console.log(err)
    res.status(500)
    res.send(err)
  }
}
export const deleteRec = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const packages = await RecService.deleteRec(id)
    res.json(packages)
  } catch (err) {
    // console.log(err)
    res.status(500)
    res.send(err)
  }
}