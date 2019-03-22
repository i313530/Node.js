import { Router, Application } from 'express'
import * as SIController from '../controllers/SI'

const ApiRouter: Router = Router()

export default (app: Application) => {
  ApiRouter.get('/', SIController.getScopeitems)
  ApiRouter.get('/field/:id', SIController.getFields)
  ApiRouter.get('/:id', SIController.getOneSI)
  ApiRouter.post('/', SIController.addScopeitem)
  ApiRouter.delete('/:id', SIController.removeScopeitem)
  app.use('/api/Scopeitem', ApiRouter)
}
