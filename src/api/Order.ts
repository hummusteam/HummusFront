import axios from 'axios'
import { Order } from '../types'

export async function placeOrder(sessionId: string, order: Order) {
  return await axios
    .post('https://orderapi.tycho.dev/Order?sessionId=' + sessionId, order)
    .then((res) => res.data)
    .catch(console.log)
}

export async function fetchAllOrders(): Promise<Order[]> {
  return await axios.get('https://orderapi.tycho.dev/Order').then((res) => res.data)
}

export async function updateOrder(order: Order) {
  return await axios
    .put('https://orderapi.tycho.dev/Order', order)
    .then((res) => res.data)
    .catch(console.log)
}
