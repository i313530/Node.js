import { Request, Response } from 'express'
import FeedbackService from '../services/feedback'
/* API Controllers */
export const getFeedbacks = async (req: Request, res: Response) => {
  try {
    const feedbacks = await FeedbackService.getFeedbacks()
    res.json(feedbacks)
  } catch (err) {
    res.status(500)
    res.send(err)
  }
}
export const addFeedback = async (req: Request, res: Response) => {
  try {
    const text = req.body.text
    const feedback = await FeedbackService.addFeedback(text)
    res.json(feedback)
  } catch (err) {
    res.status(500)
    res.send(err)
  }
}
export const removeFeedback = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    await FeedbackService.removeFeedback(id)
    res.send('ok')
  } catch (err) {
    res.status(500)
    res.send(err)
  }
}
