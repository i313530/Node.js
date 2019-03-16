import { getManager, getConnection } from 'typeorm'
import { Scopeitem } from '../models/SI'
import { ScopeitemT } from '../models/SIT'
import _ from 'lodash'
import moment from 'moment'

const getSIs = async () => {

  const selectSI = await getConnection()
    .createQueryBuilder()
    .select(['SI.SI_ID', 'SI.CREATED_AT', 'TXT.SI_NAME'])
    .from('Scopeitem', 'SI')
    .innerJoin('ScopeitemT', 'TXT', 'TXT.SI_ID = SI.SI_ID')
    // .where('PKGT.LANGU = EN')
    .orderBy('SI.SI_ID')
    .getRawMany()
  return selectSI
}
const getOneSI = async (id:string) => {

  const selectSI = await getConnection()
    .createQueryBuilder()
    .select(['SI.SI_ID', 'SI.CREATED_AT', 'TXT.SI_NAME'])
    .from('Scopeitem', 'SI')
    .innerJoin('ScopeitemT', 'TXT', 'TXT.SI_ID = SI.SI_ID')
    .where("TXT.LANGU = 'EN'")
    .andWhere('SI.SI_ID = :siid',{siid:id})
    .getRawMany()

  return selectSI
}
const addSI = async (SI_ID: string, VERSION: string, SI_NAME: string) => {
  const SIRepo = getManager().getRepository(Scopeitem)
  const SITRepo = getManager().getRepository(ScopeitemT)
  const oSI: Scopeitem = new Scopeitem()
  const oSIT: ScopeitemT = new ScopeitemT()
  oSIT.SI_ID = oSI.SI_ID = SI_ID
  if (VERSION === null) {
    oSIT.VERSION = oSI.VERSION = 'D'
  } else {
    oSIT.VERSION = oSI.VERSION = VERSION
  }
  oSI.CREATED_AT = oSI.CHANGED_AT = moment().format('YYYY-MM-DD HH:mm:ss')
  oSIT.SI_NAME = SI_NAME
  oSIT.LANGU = 'EN'
  await Promise.all([SIRepo.save(oSI), SITRepo.save(oSIT)])
  const SIoutput = {
    SI_SI_ID: oSI.SI_ID,
    SI_CREATED_AT: oSI.CREATED_AT,
    TXT_SI_NAME: oSIT.SI_NAME
  }
  return SIoutput
}
const removeSI = async (SIID: string) => {
  // console.log(PKGID)
  const SIRepo = getManager().getRepository(Scopeitem)
  const oSI = await SIRepo.findOne({ SI_ID: SIID })
  const SITRepo = getManager().getRepository(ScopeitemT)
  const oSIT = await SITRepo.find({ SI_ID: SIID })
  await SIRepo.remove(oSI)
  await SITRepo.remove(oSIT)
}

export default {
  getSIs,
  addSI,
  removeSI,
  getOneSI
}
