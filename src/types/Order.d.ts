import OrderItem from './OrderItem'

export default interface Order {
  id: string
  dateTimeCreated: string
  orderItems: OrderItem[]
  orderStatus: number
  description: string
}
