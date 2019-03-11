import { Router, Application } from 'express'
import * as PKGController from '../controllers/package'

const ApiRouter: Router = Router()

export default (app: Application) => {
  ApiRouter.get('/', PKGController.getPackages)
  ApiRouter.post('/', PKGController.addPackage)
  ApiRouter.delete('/:id', PKGController.removePackage)
  app.use('/api/packages', ApiRouter)
}
