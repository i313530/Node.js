import { getManager } from 'typeorm'
import { Feedback } from '../models/Feedback'
// import { table2 } from '../models/table2'
const getFeedbacks = async () => {
  const feedbackRepo = getManager().getRepository(Feedback)
  return feedbackRepo.find()
}
const addFeedback = async (text: string) => {
  const feedbackRepo = getManager().getRepository(Feedback)
  const feedback: Feedback = new Feedback()
  feedback.text = text
  return feedbackRepo.save(feedback)
}
const removeFeedback = async (id: number) => {
  const feedbackRepo = getManager().getRepository(Feedback)
  const feedback = await feedbackRepo.findOne(id)
  return feedbackRepo.remove(feedback)
}
export default {
  getFeedbacks,
  addFeedback,
  removeFeedback  
}
