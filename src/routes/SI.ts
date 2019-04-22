import { Router, Application } from 'express'
import * as SIController from '../controllers/SI'

const ApiRouter: Router = Router()

export default (app: Application) => {
  ApiRouter.get('/', SIController.getScopeitems)
  ApiRouter.get('/field/:id', SIController.getFields)
  ApiRouter.get('/record/:id', SIController.getrecords)
  ApiRouter.post('/record/:id', SIController.addsiinitrecord)
  ApiRouter.post('/field/:siid/:id', SIController.addField)
  ApiRouter.get('/:id', SIController.getOneSI)
  ApiRouter.post('/', SIController.addScopeitem)
  ApiRouter.delete('/:id', SIController.removeScopeitem)
  ApiRouter.put('/field', SIController.updataSiFld)
  ApiRouter.delete('/field/:siid/:id', SIController.deleteSiFld)
  app.use('/api/Scopeitem', ApiRouter)
}
