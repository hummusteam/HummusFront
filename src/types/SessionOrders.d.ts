import Order from './Order'

export default interface SessionOrders {
  orders: Order[]
  totalAmount: number
}
