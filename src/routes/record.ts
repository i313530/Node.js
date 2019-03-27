import { Router, Application } from 'express'
import * as RecController from '../controllers/record'

const ApiRouter: Router = Router()

export default (app: Application) => {
  ApiRouter.delete(':id', RecController.deleteRec)
  ApiRouter.put(':id', RecController.upsertRec)
  ApiRouter.get('/:id', RecController.getRecData)
  app.use('/api/records', ApiRouter)
}
