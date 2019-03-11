import { getManager } from 'typeorm'
import { PkgSiAssign } from '../models/PkgSiA'

const getPKGSIA = async (PKGID: string) => {
  const PKGSIARepo = getManager().getRepository(PkgSiAssign)
  return PKGSIARepo.find({ PKG_ID: PKGID, VERSION: 'D' })
}
const addPKGSIA = async (PKG_ID: string, SI_ID: string, VERSION: string) => {
  const PKGSIARepo = getManager().getRepository(PkgSiAssign)
  const oPkgSiA: PkgSiAssign = new PkgSiAssign()
  oPkgSiA.PKG_ID = PKG_ID
  oPkgSiA.SI_ID = SI_ID
  oPkgSiA.VERSION = VERSION
  return PKGSIARepo.save(oPkgSiA)
}
const removePKGSIA = async (PKGID: string, SIID: string) => {
  const PKGRepo = getManager().getRepository(PkgSiAssign)
  const oPkgSiA = await PKGRepo.findOne({ PKG_ID: PKGID, SI_ID: SIID })
  return PKGRepo.remove(oPkgSiA)
}
export default {
  getPKGSIA,
  addPKGSIA,
  removePKGSIA
}
