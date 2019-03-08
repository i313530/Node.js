import { Router, Application } from 'express'
import * as FeedbackController from '../controllers/feedback'

const ApiRouter: Router = Router()

export default (app: Application) => {
  ApiRouter.get('/', FeedbackController.getFeedbacks)
  ApiRouter.post('/', FeedbackController.addFeedback)
  ApiRouter.delete('/:id', FeedbackController.removeFeedback)
  app.use('/api/feedbacks', ApiRouter)
}
