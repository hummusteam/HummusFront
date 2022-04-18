import axios from 'axios'
import { Session } from '../types'

export async function createSessionFromTable(table: number): Promise<Session> {
  return await axios
    .post('https://sessionapi.tycho.dev/Session/StartSession/' + table)
    .then((res) => res.data)
    .catch(console.log)
}
