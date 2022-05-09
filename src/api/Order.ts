import axios from 'axios'
import { Order } from '../types'

export async function placeOrder(sessionId: string, order: Order) {
  return await axios
    .post('https://orderapi.tycho.dev/Order?sessionId=' + sessionId, order)
    .then((res) => res.data)
    .catch(console.log)
}
