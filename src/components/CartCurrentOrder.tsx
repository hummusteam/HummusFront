import '../styles/Cart.css'
import Cookies from 'universal-cookie'
import { OrderItem, Order, MenuItem } from '../types'
import { fetchMenuItemByID } from '../api/MenuItems'
import { useEffect, useState } from 'react'
import OrderItemLine from './OrderItemLine'

export default function CartCurrentOrder() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])

  useEffect(() => {
    let cartCookies = new Cookies()

    if (cartCookies.get('_order')) {
      let storedFullOrder: OrderItem[] = cartCookies.get('_order')
      setOrderItems(storedFullOrder)

      for (let i = 0; i < storedFullOrder.length; i++) {
        fetchMenuItemByID(storedFullOrder[i].menuItemId).then((data) => {
          setMenuItems((varr) => [...varr, data])
        })
      }
    }
  }, [])

  return (
    <>
      <div></div>
      <div className="orders-container">

        <div className="orderContainerBoxes">
          {orderItems.length != 0 &&
            menuItems.length != 0 &&
            orderItems.map((orderItem) => {
              for (let i = 0; i < menuItems.length; i++) {
                if (orderItem.menuItemId === menuItems[i].id) {
                  return <OrderItemLine key={orderItem.id} menuItem={menuItems[i]} orderItem={orderItem} />
                }
              }
            })}
        </div>

        <div className="orderContainerBoxes">
          <div className="previous-orders">{/* <Select options={options} /> */}</div>
        </div>

        <div className="orderContainerBoxes">
          <div className="notes">
            <input className="e-input" type="text" placeholder="Notes" />
          </div>
        </div>

        <div className="orderContainerBoxes">
          <div className="Botton">
            <button type="submit" className="btn">
              Place order
            </button>

            <button type="button" className="btn">
              Payment
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
