import { getManager, getConnection } from 'typeorm'
import { Record } from '../models/record'
import { RecCell } from '../models/reccell'
import { RecordOutput } from '../models/RecData'
import moment from 'moment'
import _ from 'lodash'

const getRecdata = async (ID: string) => {
  const RecData = new RecordOutput()
  const RecRepo = getManager().getRepository(Record)
  const oRec = await RecRepo.findOne({ REC_ID: ID })
  _.assignIn(RecData, oRec)

  const cellRepo = getManager().getRepository(RecCell)
  const Reccells = await cellRepo.find({ REC_ID: ID })
  // RecData.cells  Reccells
  return RecData
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
const upsertRecdata = async (ID: string,data:RecordOutput) => {
  const CellRepo = getManager().getRepository(RecCell)
  const Recdata = await CellRepo.find({ REC_ID: ID })
  
  return Recdata
}
export default {
  getRecdata,
  deleteRec,
  updateRec,
  upsertRecdata
}
