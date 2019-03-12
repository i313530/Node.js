import { getManager, Timestamp, getConnection } from 'typeorm'
import { Package } from '../models/package'
import { PackageT } from '../models/packageT'
import _ from 'lodash'
import moment from 'moment'
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
  // const PKGRepo = getManager().getRepository(Package)
  const selectPKG = await getConnection()
    .createQueryBuilder(Package, 'PKG')
    .select('PKG.PKG_ID')
    .addSelect('TXT.PKG_NAME')    
    .addSelect('PKG.CREATED_AT')    
    .innerJoinAndSelect(PackageT, 'TXT', 'TXT.PKG_ID = PKG.PKG_ID')
    .orderBy('PKG.PKG_ID')
    .getMany()
// console.log(selectPKG)
  // const data: any[] = await PKGRepo.find()

  // return _.map(data, output => {
  //   return { id: output.PKG_ID, name: '' }
  // })
  return selectPKG
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
  oPackage.CREATED_AT = oPackage.CHANGED_AT = moment().format('YYYY-MM-DD HH:mm:ss')
  oPackageT.PKG_NAME = PKG_NAME
  oPackageT.LANGU = 'EN'
  await Promise.all([PKGRepo.save(oPackage), PKGTRepo.save(oPackageT)])
}
const removePKG = async (PKGID: string) => {
  const PKGRepo = getManager().getRepository(Package)
  const oPackag = await PKGRepo.findOne(PKGID)
  const PKGTRepo = getManager().getRepository(PackageT)
  const oPackagT = await PKGTRepo.find({ PKG_ID: PKGID })
  await PKGRepo.remove(oPackag)
  await PKGTRepo.remove(oPackagT)
}
const renamePKG = async (PKG_ID: string, name: string) => {
  const PKGRepo = getManager().getRepository(Package)
  const oPackag = await PKGRepo.findOne(PKG_ID)
  const PKGTRepo = getManager().getRepository(PackageT)
  const oPackagT = await PKGTRepo.findOne(PKG_ID)
  oPackagT.LANGU = 'EN'
  oPackagT.PKG_NAME = name
  await PKGTRepo.save(oPackagT)
  oPackag.CHANGED_AT = moment().format('YYYY-MM-DD HH:mm:ss')
  await PKGRepo.save(oPackag)
}
export default {
  getPKG,
  addPKG,
  renamePKG,
  removePKG
}
