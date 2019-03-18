import { getManager, getConnection } from 'typeorm'
import { Package } from '../models/package'
import { PackageT } from '../models/packageT'
import _ from 'lodash'
import moment from 'moment'
import { stringify } from 'querystring'
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
  // const pkgfull = {PKG_ID:String, CREATED_AT: String, PKG_NAME: String}
  const selectPKG = await getConnection()
    .createQueryBuilder()
    .select(['PKG.PKG_ID', 'PKG.CREATED_AT', 'TXT.PKG_NAME'])
    // .addSelect('PKG.CREATED_AT')
    // .addSelect('TXT.PKG_NAME')
    .from('Package', 'PKG')
    .innerJoin('PackageT', 'TXT', 'TXT.PKG_ID = PKG.PKG_ID')
    // .where('PKGT.LANGU = EN')
    .orderBy('PKG.PKG_ID')
    .getRawMany()
  // console.log(selectPKG)
  // const data: any[] = await PKGRepo.find()

  // return _.map(data, output => {
  //   return { id: output.PKG_ID, name: '' }
  // })
  return selectPKG
}
const PKGHead = async (ID: string) => {
  const selectPKG = await getConnection()
    .createQueryBuilder()
    .select(['PKG.PKG_ID', 'PKG.COMPLETION', 'PKG.OutOfScope', 'PKG.CREATED_AT', 'PKG.CHANGED_AT', 'TXT.PKG_NAME'])
    .from('Package', 'PKG')
    .innerJoin('PackageT', 'TXT', 'TXT.PKG_ID = PKG.PKG_ID')
    .where('PKG.PKG_ID = :id', { id: ID })
    .getRawOne()
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
  oPackage.OutOfScope = false
  oPackage.CREATED_AT = oPackage.CHANGED_AT = moment().format('YYYY-MM-DD HH:mm:ss')
  oPackageT.PKG_NAME = PKG_NAME
  oPackageT.LANGU = 'EN'
  await Promise.all([PKGRepo.save(oPackage), PKGTRepo.save(oPackageT)])
  const PKGoutput = {
    PKG_PKG_ID: oPackage.PKG_ID,
    PKG_CREATED_AT: oPackage.CREATED_AT,
    TXT_PKG_NAME: oPackageT.PKG_NAME
  }
  return PKGoutput
}
const removePKG = async (PKGID: string) => {
  // console.log(PKGID)
  const PKGRepo = getManager().getRepository(Package)
  const oPackag = await PKGRepo.findOne({ PKG_ID: PKGID })
  const PKGTRepo = getManager().getRepository(PackageT)
  const oPackagT = await PKGTRepo.find({ PKG_ID: PKGID })
  await PKGRepo.remove(oPackag)
  await PKGTRepo.remove(oPackagT)
}
const renamePKG = async (PKGID: string, name: string, Langu: string) => {
  const PKGRepo = getManager().getRepository(Package)
  const oPackag = await PKGRepo.findOne({ PKG_ID: PKGID })
  const PKGTRepo = getManager().getRepository(PackageT)
  const oPackagT = await PKGTRepo.findOne({ PKG_ID: PKGID })
  switch (Langu) {
    case 'en-US':
      oPackagT.LANGU = 'EN'
      break
    case 'zh-CN':
      oPackagT.LANGU = 'CN'
      break
  }
  oPackagT.PKG_NAME = name
  await PKGTRepo.save(oPackagT)
  oPackag.CHANGED_AT = moment().format('YYYY-MM-DD HH:mm:ss')
  await PKGRepo.save(oPackag)
}

const savePackage = async (PKG: InputPKG) => {
  const PKGRepo = getManager().getRepository(Package)
  const oPackage = await PKGRepo.findOne({ PKG_ID: PKG.PKG_ID })
  // _.forEach(PKG,function(value,key){
  //   oPackag[key] = value
  // })
  oPackage.COMPLETION = PKG.COMPLETION
  oPackage.OutOfScope = PKG.OutOfScope
  oPackage.CHANGED_AT = moment().format('YYYY-MM-DD HH:mm:ss')
  await PKGRepo.save(oPackage)
}

class InputPKG {
  public PKG_ID: string
  public COMPLETION: string
  public OutOfScope: boolean
}
export default {
  getPKG,
  PKGHead,
  addPKG,
  renamePKG,
  removePKG,
  savePackage
}
