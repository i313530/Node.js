import { Request, Response } from 'express'
import SIService from '../services/SI'

/* API Controllers */
export const getScopeitems = async (req: Request, res: Response) => {
  try {
    const Scopeitems = await SIService.getSIs()
    res.json(Scopeitems)
  } catch (err) {
    console.log(err)
    res.status(500)
    res.send(err)
  }
}
export const getOneSI = async (req: Request, res: Response) => {
  try {
    const SIid = req.params.id
    const Scopeitems = await SIService.getOneSI(SIid)
    res.json(Scopeitems)
  } catch (err) {
    console.log(err)
    res.status(500)
    res.send(err)
  }
}
export const addScopeitem = async (req: Request, res: Response) => {
  try {
    const SIid = req.body.SI_ID
    const SIname = req.body.SI_NAME
    const oSI = await SIService.addSI(SIid, null, SIname)
    res.json(oSI)
  } catch (err) {
    console.log(err)
    res.status(500)
    res.send(err)
  }
}
export const removeScopeitem = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    await SIService.removeSI(id)
    res.send('ok')
  } catch (err) {
    console.log(err)
    res.status(500)
    res.send(err)
  }
}
