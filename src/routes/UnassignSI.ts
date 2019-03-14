import { Router, Application } from 'express'
import * as PKGAController from '../controllers/package'

const ApiRouter: Router = Router()

export default (app: Application) => {
  ApiRouter.get('/:id', PKGAController.getUnassignments)
  app.use('/api/unassignSI', ApiRouter)
}