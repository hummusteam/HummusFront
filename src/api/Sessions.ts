import { Session, SessionOrders } from '../types'
import axios from 'axios'

export async function startSession(tableId: string): Promise<Session> {
  return await axios
    .post('https://sessionapi.tycho.dev/Session/StartSession/' + tableId)
    .then((res) => res.data)
    .catch(console.log)
}

export async function fetchSessionOrders(sessionId: string): Promise<SessionOrders> {
  return await axios
    .get('https://sessionapi.tycho.dev/SessionSummary/' + sessionId)
    .then((res) => res.data)
    .catch(console.log)
}
