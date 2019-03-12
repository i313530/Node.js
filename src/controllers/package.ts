import { Request, Response } from 'express'
import PKGService from '../services/pkg'
import PKGSIAService from '../services/pkgsiA'
/* API Controllers */
export const getPackages = async (req: Request, res: Response) => {
  try {
    const packages = await PKGService.getPKG()
    console.log(packages)
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
    const pkgname = req.params.pkgname
    await PKGService.renamePKG(id, pkgname)
    res.send('ok')
  } catch (err) {
    // console.log(err)
    res.status(500)
    res.send(err)
  }
}
