import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import '../styles/CartButton.css'
import { OrderItem } from '../types'

export default function CartButton() {
  const cartImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Shopping_cart_font_awesome.svg/512px-Shopping_cart_font_awesome.svg.png'
  const cookies = new Cookies()
  const orderItems: OrderItem[] = cookies.get('_order')

  return (
    <Link to={'/cart'}>
      <div className="cart-button-container">
        <img src={cartImage} />
      </div>
        {/* <div>{orderItems?.length ?? 0}</div> */}
    </Link>
  )
}
