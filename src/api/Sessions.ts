import { Session, SessionOrders } from '../types'
import axios from 'axios'

export async function startSession(): Promise<Session> {
  return await axios
    .get('https://sessionapi.tycho.dev/Session/StartSession/')
    .then((res) => res.data)
    .catch(console.log)
}

export async function enterSession(pin: string): Promise<Session> {
  return await axios
    .get('https://sessionapi.tycho.dev/Session/GetSessionByPassword/' + pin)
    .then((res) => res.data)
    .catch(console.log)
}

export async function joinTableSession(table: string, pin: string): Promise<Session> {
  return await axios
    .put('https://sessionapi.tycho.dev/Session/RestartSession/' + table + '/' + pin)
    .then((res) => res.data)
    .catch(console.log)
}

export async function putSession(session: Session) {
  return await axios
    .put('https://sessionapi.tycho.dev/Session', session)
    .then((res) => res.data)
    .catch(console.log)
}

export async function fetchSessionOrders(sessionId: string): Promise<SessionOrders> {
  return await axios
    .get('https://sessionapi.tycho.dev/SessionSummary/' + sessionId)
    .then((res) => res.data)
    .catch(console.log)
}
