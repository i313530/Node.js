import { Request, Response } from 'express'
import PKGService from '../services/pkg'
import PKGSIAService from '../services/pkgsiA'


/* API Controllers */
export const getPackages = async (req: Request, res: Response) => {
  try {
    const packages = await PKGService.getPKG()
    // console.log(packages)
    res.json(packages)
  } catch (err) {
    // console.log(err)
    res.status(500)
    res.send(err)
  }
}
export const addPackage = async (req: Request, res: Response) => {
  try {
    const pkgid = req.body.PKG_ID
    const pkgname = req.body.PKG_NAME
    const oPackage = await PKGService.addPKG(pkgid, null, pkgname)
    res.json(oPackage)
  } catch (err) {
    // console.log(err)
    res.status(500)
    res.send(err)
  }
}
export const removePackage = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    await PKGService.removePKG(id)
    res.send('ok')
  } catch (err) {
    // console.log(err)
    res.status(500)
    res.send(err)
  }
}
export const renamePackage = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const pkgname = req.body.PKG_NAME
    const Langu = req.body.LANGU
    await PKGService.renamePKG(id, pkgname, Langu)
    res.send('ok')
  } catch (err) {
    // console.log(err)
    res.status(500)
    res.send(err)
  }
}

export const getOnePackage = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const oPackage = await PKGService.PKGHead(id)
    res.json(oPackage)
  } catch (err) {
    // console.log(err)
    res.status(500)
    res.send(err)
  }
}
export const getAssignments = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const oAssign = await PKGSIAService.getPKGSIA(id)
    res.json(oAssign)
  } catch (err) {
    console.log(err)
    res.status(500)
    res.send(err)
  }
}
export const addAssignment = async (req: Request, res: Response) => {
  try {
    const id = req.params.pkgid
    const si = req.params.siid
    const oAssign = await PKGSIAService.addPKGSIA(id, si, null)
    res.json(oAssign)
  } catch (err) {
    console.log(err)
    res.status(500)
    res.send(err)
  }
}
export const removeAssignment = async (req: Request, res: Response) => {
  try {
    const id = req.params.pkgid
    const si = req.params.siid
    await PKGSIAService.removePKGSIA(id, si)
    res.json('OK')
  } catch (err) {
    console.log(err)
    res.status(500)
    res.send(err)
  }
}
export const getUnassignments = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const oAssign = await PKGSIAService.getUnassignSIs(id)
    res.json(oAssign)
  } catch (err) {
    console.log(err)
    res.status(500)
    res.send(err)
  }
}
export const savePackage = async (req: Request, res: Response) => {
  try {
    const oPackage = {
      PKG_ID: req.body.PKG_ID,
      COMPLETION: req.body.COMPLETION,
      OutOfScope: req.body.OutOfScope, // === 'true' ? true : false
      Type: req.body.Type
    }
    await PKGService.savePackage(oPackage)
    res.json(oPackage)
  } catch (err) {
    console.log(err)
    res.status(500)
    res.send(err)
  }
}
import { Scopeitem } from '../models/SI'
export const createNewSIandAssign = async (req: Request, res: Response) => {
  try {
    const pkgid = req.params.pkgid
    const oSI: Scopeitem = {
      SI_ID: req.params.siid,
      VERSION: 'D',
      currentName: '',
      CHANGED_AT: '',
      CHANGED_BY: '',
      CREATED_AT: '',
      CREATED_BY: ''
    }
    PKGSIAService.createNewSIandAssign(pkgid, oSI)
    res.json('dd')
  } catch (err) {
    console.log(err)
    res.status(500)
    res.send(err)
  }
}
