import { Request, Response } from 'express'
import PKGService from '../services/pkg'
import PKGSIAService from '../services/pkgsiA'
/* API Controllers */
export const getPackages = async (req: Request, res: Response) => {
  try {
    const packages = await PKGService.getPKG()
    res.json(packages)
  } catch (err) {
    res.status(500)
    res.send(err)
  }
}
export const addPackage = async (req: Request, res: Response) => {
  try {
    const pkgid = req.body.id
    const feedback = await PKGService.addPKG(pkgid, null)
    res.json(feedback)
  } catch (err) {
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
    res.status(500)
    res.send(err)
  }
}
