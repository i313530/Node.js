import { Request, Response } from 'express'
import SIService from '../services/SI'
import { SIField } from '../models/SIField'
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

export const getFields = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const oField = await SIService.getFields(id)
    res.json(oField)
  } catch (err) {
    console.log(err)
    res.status(500)
    res.send(err)
  }
}
export const addField = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const siid = req.params.siid
    const oField = await SIService.addField(siid, id)
    res.json(oField)
  } catch (err) {
    console.log(err)
    res.status(500)
    res.send(err)
  }
}
export const getrecords = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const oRecs = await SIService.getrecords(id)
    res.json(oRecs)
  } catch (err) {
    console.log(err)
    res.status(500)
    res.send(err)
  }
}
export const addsiinitrecord = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const oRecs = await SIService.createNewRec(id)
    res.json(oRecs)
  } catch (err) {
    console.log(err)
    res.status(500)
    res.send(err)
  }
}
export const updataSiFld = async (req: Request, res: Response) => {
  try {
    const Fld = new SIField()
    Fld.SI_ID = req.body.SI_ID
    Fld.FIELD = req.body.FIELD
    Fld.DISPLAY_ORDER = req.body.DISPLAY_ORDER
    Fld.ALIAS = req.body.ALIAS
    Fld.VISIBILITY = req.body.VISIBILITY
    Fld.TYPE = req.body.TYPE
    const oRecs = await SIService.updateField(Fld)
    res.json(oRecs)
  } catch (err) {
    console.log(err)
    res.status(500)
    res.send(err)
  }
}

export const deleteSiFld = async (req: Request, res: Response) => {
  try {
    const siid = req.params.siid
    const fldid = req.params.id
    await SIService.removeField(siid, fldid)
    res.json(fldid)
  } catch (err) {
    console.log(err)
    res.status(500)
    res.send(err)
  }
}