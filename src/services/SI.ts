import { getManager } from 'typeorm'
import { Scopeitem } from '../models/si'
import { ScopeitemT } from '../models/SIT'
import { isNull } from 'util'

const getSI = async () => {
  const SIRepo = getManager().getRepository(Scopeitem)
  return SIRepo.find()
}
const addSI = async (SI_ID: string, VERSION: string) => {
  const SIRepo = getManager().getRepository(Scopeitem)
  const oScopeitem: Scopeitem = new Scopeitem()
  oScopeitem.SI_ID = SI_ID
  if (VERSION === null) {
    oScopeitem.VERSION = 'D'
  } else {
    oScopeitem.VERSION = VERSION
  }
  return SIRepo.save(oScopeitem)
}
const removeSI = async (SI_ID: string) => {
  const SIRepo = getManager().getRepository(Scopeitem)
  const oScopeitem = await SIRepo.findOne(SI_ID)
  return SIRepo.remove(oScopeitem)
}
export default {
  getSI,
  addSI,
  removeSI
}
