import { getManager, getConnection } from 'typeorm'
import { Record } from '../models/record'
import { RecCell } from '../models/reccell'
import { RecordOutput } from '../models/RecData'
import { SIField } from '../models/SIField'
import moment from 'moment'
import _ from 'lodash'

const getRecdata = async (ID: string) => {
  const RecData = new RecordOutput()
  const RecRepo = getManager().getRepository(Record)
  const oRec = await RecRepo.findOne({ REC_ID: ID })
  _.assignIn(RecData, oRec)

  const cellRepo = getManager().getRepository(RecCell)
  const Reccells = await cellRepo.find({ REC_ID: ID })
  RecData.cells = Reccells
  return RecData
}

const deleteRec = async (ID: string) => {
  const RecRepo = getManager().getRepository(Record)
  // const Recs = await RecRepo.find({ SI_ID: SIID })
  // return Recs
}

const upsertRecdata = async (SIID: string, data: RecordOutput[]) => {
  const FLDRepo = getManager().getRepository(SIField)
  const FLDs = await FLDRepo.find({ SI_ID: SIID })


  data.forEach(async (rec) => {
    const CellRepo = getManager().getRepository(RecCell)
    const Cells = await getCell(rec.REC_ID)
    const inputCells = rec.cells
    _.forEach(FLDs, (FLD) => {
      const indexofDBcell = _.findIndex(Cells, { 'FLD_ID': FLD.FIELD })
      const indexofInputcell = _.findIndex(inputCells, { 'FLD_ID': FLD.FIELD })
      if (indexofDBcell === -1) {
        const newCell = new RecCell()
        newCell.REC_ID = rec.REC_ID
        newCell.VERSION = 'D'
        newCell.FLD_ID = FLD.FIELD
        newCell.VALUE = rec.cells[indexofInputcell].VALUE
        CellRepo.save(newCell)
      } else {
        Cells[indexofDBcell].VALUE = rec.cells[indexofInputcell].VALUE
        CellRepo.save(Cells[indexofDBcell])
      }
    })
  })
}

const getCell = async (ID: string) => {
  const CellRepo = getManager().getRepository(RecCell)
  const Cells = await CellRepo.find({ REC_ID: ID })
  return Cells
}

export default {
  getRecdata,
  deleteRec,
  upsertRecdata
}
