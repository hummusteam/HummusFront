import axios from 'axios'
import { Feedback } from '../types'

export async function fetchFeedbacks(): Promise<Feedback[]> {
    return await axios
      .get('https://sessionapi.tycho.dev/Feedback')
      .then((res) => res.data)
      .catch(console.log)
  }
  
export async function postFeedback(feedback: Feedback) {
    await axios
      .post('https://sessionapi.tycho.dev/Feedback', feedback, {
        headers: { 'Content-Type': 'application/json' },
      })
      .catch(console.log)
}

export async function fetchFeedbackById(feedback: string): Promise<Feedback> {
    return await axios
    .get('https://sessionapi.tycho.dev/Feedback/' + feedback)
    .then((res) => res.data)
    .catch(console.log)
}

export async function fetchFeedbackBySessionId(feedback: string): Promise<Feedback> {
    return await axios
    .get('https://sessionapi.tycho.dev/Feedback/GetBySessionId/' + feedback)
    .then((res) => res.data)
    .catch(console.log)
}
