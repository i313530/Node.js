import { getManager, getConnection } from 'typeorm'
import { PkgSiAssign } from '../models/PkgSiA'
import { Scopeitem } from '../models/SI'
import _ from 'lodash'

const getPKGSIA = async (PKGID: string) => {
  const selectData = await getConnection()
    .createQueryBuilder()
    .select(['AG.SI_ID', 'TXT.SI_NAME'])
    .from('PkgSiAssign', 'AG')
    .innerJoin('ScopeitemT', 'TXT', 'AG.SI_ID = TXT.SI_ID')
    .where('AG.PKG_ID = :id', { id: PKGID })
    .andWhere('TXT.LANGU = :LA', { LA: 'EN' })
    // .orderBy('Assign.SI_ORDER')
    .getRawMany()

  return selectData
}
const addPKGSIA = async (PKG_ID: string, SI_ID: string, VERSION: string) => {
  const PKGSIARepo = getManager().getRepository(PkgSiAssign)
  const oPkgSiA: PkgSiAssign = new PkgSiAssign()
  oPkgSiA.PKG_ID = PKG_ID
  oPkgSiA.SI_ID = SI_ID
  if (VERSION === null) {
    oPkgSiA.VERSION = VERSION
  } else {
    oPkgSiA.VERSION = 'D'
  }
  // oPkgSiA.SI_ORDER = await getMax(PKG_ID)
  console.log(oPkgSiA)
  return await PKGSIARepo.save(oPkgSiA)
}
const getMax = async (id: string) => {
  const PKGSIARepo = getManager().getRepository(PkgSiAssign)
  const allSi = await PKGSIARepo.find({ PKG_ID: id })
  const maxline = _.maxBy(allSi, 'SI_ORDER')
  return maxline.SI_ORDER
}
const removePKGSIA = async (PKGID: string, SIID: string) => {
  const PKGARepo = getManager().getRepository(PkgSiAssign)
  const oPkgSiA = await PKGARepo.findOne({ PKG_ID: PKGID, SI_ID: SIID })
  return PKGARepo.remove(oPkgSiA)
}
const getUnassignSIs = async (PKGID: string) => {
  const PKGSIARepo = getManager().getRepository(PkgSiAssign)
  const Assigned = await PKGSIARepo.find({ PKG_ID: PKGID })
  const allSis = await getallSis()

  _.forEach(Assigned, d => {
    _.remove(allSis, n => {
      return n.SI_ID === d.SI_ID
    })
  })

  return allSis
}

const getallSis = async () => {
  const SIRepo = getManager().getRepository(Scopeitem)
  const allSIs = await SIRepo.find()
  return allSIs
}

export default {
  getPKGSIA,
  addPKGSIA,
  removePKGSIA,
  getUnassignSIs
}
