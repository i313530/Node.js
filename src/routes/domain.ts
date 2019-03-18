import { Router, Application } from 'express'
import * as DomainController from '../controllers/domain'

const ApiRouter: Router = Router()

export default (app: Application) => {
  ApiRouter.get('/', DomainController.getDomainValues)
  app.use('/api/domain', ApiRouter)
}
