import '../styles/OrderItemLine.css'
import { MenuItem, OrderItem } from '../types'

export default function OrderItemLine({ menuItem, orderItem }: { menuItem: MenuItem; orderItem: OrderItem }) {
  const qty = 1

  return (
    <div className="orderlineContainer">
      <div className="orderlineDetails">
        {/* <img className="orderlineImage" src={menuItem.image} /> */}
        <div>
          <h3>
            {qty} x {menuItem.name}
          </h3>
        </div>
        <div className="orderlineQtys">
          <h3>
            {menuItem.price * qty} <small>€</small>
          </h3>
          <div className="qtyBtn">
            <button>+</button>
            <div className='qtyInput'>{qty}</div>
            <button>-</button>
          </div>
        </div>
      </div>
      <hr />
    </div>
  )
}
