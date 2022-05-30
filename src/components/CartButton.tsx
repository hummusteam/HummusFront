import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import '../styles/CartButton.css'
import { OrderItem } from '../types'

export default function CartButton() {
  const cookies = new Cookies()
  const orderItems: OrderItem[] = cookies.get('_order')

  return (
    <Link to={'/cart'}>
      <div className="cart-button-container">Go to cart ({orderItems?.length ?? 0})</div>
    </Link>
  )
}
