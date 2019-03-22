import { getManager, getConnection } from 'typeorm'
import { Scopeitem } from '../models/SI'
import { ScopeitemT } from '../models/SIT'
import { SIField } from '../models/SIField'
import { SIRec } from '../models/SI_REC'
import { Record } from '../models/record'
import uuid from 'uuid/v4'
import _ from 'lodash'
import moment from 'moment'
// const uuidv4 = require('uuid/v4')
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
const getOneSI = async (id: string) => {
  const selectSI = await getConnection()
    .createQueryBuilder()
    .select(['SI.SI_ID', 'SI.CREATED_AT', 'SI.CHANGED_AT', 'TXT.SI_NAME'])
    .from('Scopeitem', 'SI')
    .innerJoin('ScopeitemT', 'TXT', 'TXT.SI_ID = SI.SI_ID')
    .where("TXT.LANGU = 'EN'")
    .andWhere('SI.SI_ID = :siid', { siid: id })
    .getRawOne()

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
const getFields = async (SIID: string) => {
  const FLDRepo = getManager().getRepository(SIField)
  const FLDs = await FLDRepo.find({ SI_ID: SIID })
  return FLDs
}
const updateField = async (SIID: string,FLD:SIField) => {
  const FLDRepo = getManager().getRepository(SIField)
  const FLDs = await FLDRepo.findOne({ SI_ID: SIID ,FIELD :FLD.FIELD})
  return FLDs
}
const addField = async (SIID: string, fldid: string) => {
  const FLDRepo = getManager().getRepository(SIField)
  const oFLD = new SIField()
  oFLD.SI_ID = SIID
  oFLD.FIELD = fldid
  oFLD.VERSION = 'D'
  oFLD.VISIBILITY = false
  const SIRepo = getManager().getRepository(Scopeitem)
  const oSI = await SIRepo.findOne({ SI_ID: SIID })
  oSI.CHANGED_AT = moment().format('YYYY-MM-DD HH:mm:ss')
  await SIRepo.save(oSI)
  await FLDRepo.save(oFLD)
  return oFLD
}
const getrecords = async (SIID: string) => {
  const RecRepo = getManager().getRepository(SIRec)
  const Recs = await RecRepo.find({ SI_ID: SIID })
  return Recs
}
const createNewRec = async (SIID: string) => {
  const RecRepo = getManager().getRepository(Record)
  const SiRecRepo = getManager().getRepository(SIRec)
  const oRec = new Record()
  const oSiRec = new SIRec()
  const SIRepo = getManager().getRepository(Scopeitem)
  const oSI = await SIRepo.findOne({ SI_ID: SIID })
  oSI.CHANGED_AT = moment().format('YYYY-MM-DD HH:mm:ss')
  oSiRec.REC_ID = oRec.REC_ID = uuid()
  oSiRec.VERSION = oRec.VERSION = 'D'
  oSiRec.SI_ID = SIID
  oSI.CHANGED_AT = oSiRec.CREATED_AT = oRec.CREATED_AT = oRec.CHANGED_AT = moment().format('YYYY-MM-DD HH:mm:ss')
  try {
    Promise.all([RecRepo.save(oRec), SiRecRepo.save(oSiRec), SIRepo.save(oSI)])
    return oSiRec
  } catch (err) {
    return false
  }
}

export default {
  getSIs,
  addSI,
  removeSI,
  getOneSI,
  getFields,
  addField,
  getrecords,
  createNewRec,
  updateField
}
