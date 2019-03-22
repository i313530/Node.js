import { getManager, getConnection } from 'typeorm'
import { Record } from '../models/record'
import { RecCell } from '../models/reccell'
import moment from 'moment'

const getRecdata = async (ID: string) => {
  const RecRepo = getManager().getRepository(RecCell)
  const Recdata = await RecRepo.find({ REC_ID: ID })
  return Recdata
}

const deleteRec = async (ID: string) => {
  const RecRepo = getManager().getRepository(Record)
  // const Recs = await RecRepo.find({ SI_ID: SIID })
  // return Recs
}
const updateRec = async (ID: string) => {
  const RecRepo = getManager().getRepository(RecCell)
  const Recdata = await RecRepo.find({ REC_ID: ID })
  return Recdata
}
export default {
  getRecdata,
  deleteRec,
  updateRec
}
