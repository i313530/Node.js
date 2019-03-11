import { getManager } from 'typeorm'
import { Package } from '../models/package'
import { PackageT } from '../models/packageT'
import _ from 'lodash'

// let oPKGout = {
//   id: string,
//   name: string
// }
// let oPKG_arr:Array<oPKGout>
/*
const a = _.map(data, el => {
  return { id: el.PKG_ID, name: '' }
})
*/
const getPKG = async () => {
  const PKGRepo = getManager().getRepository(Package)
  const data: any[] = await PKGRepo.find()
  return _.map(data, el => {
    return { id: el.PKG_ID, name: '' }
  })
}
const addPKG = async (PKG_ID: string, VERSION: string, PKG_NAME: string) => {
  const PKGRepo = getManager().getRepository(Package)
  const PKGTRepo = getManager().getRepository(PackageT)
  const oPackage: Package = new Package()
  const oPackageT: PackageT = new PackageT()
  oPackageT.PKG_ID = oPackage.PKG_ID = PKG_ID
  if (VERSION === null) {
    oPackageT.VERSION = oPackage.VERSION = 'D'
  } else {
    oPackageT.VERSION = oPackage.VERSION = VERSION
  }
  oPackageT.PKG_NAME = PKG_NAME
  oPackageT.LANGU = 'EN'
  // await Promise.all([])
  PKGTRepo.save(oPackageT)
  return PKGRepo.save(oPackage)
}
const removePKG = async (PKG_ID: string) => {
  const PKGRepo = getManager().getRepository(Package)
  const oPackag = await PKGRepo.findOne(PKG_ID)
  return PKGRepo.remove(oPackag)
}
const renamePKG = async (PKG_ID: string, name: string) => {
  const PKGTRepo = getManager().getRepository(PackageT)
  const oPackagT = await PKGTRepo.findOne(PKG_ID)
  return PKGTRepo.remove(oPackagT)
}
export default {
  getPKG,
  addPKG,
  renamePKG,
  removePKG
}
