import { Router, Application } from 'express'
import * as PKGAController from '../controllers/package'

const ApiRouter: Router = Router()

export default (app: Application) => {
  ApiRouter.post('/:pkgid/:siid', PKGAController.addAssignment)
  ApiRouter.delete('/:pkgid/:siid', PKGAController.removeAssignment)
  ApiRouter.get('/:id', PKGAController.getAssignments)
  app.use('/api/pkgsiA', ApiRouter)
}
