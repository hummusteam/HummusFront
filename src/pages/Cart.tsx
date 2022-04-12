import { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import { fetchMenuItemByID } from '../api/MenuItems'
import { Navigation, OrderItemLine } from '../components'
import { MenuItem, OrderItem } from '../types'

export default function Cart() {
  const banner = 'https://www.nestleprofessionalmena.com/sites/default/files/2020-05/Vision%20banner.png'

  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])

  useEffect(() => {
    let cartCookies = new Cookies()

    if (cartCookies.get('_order')) {
      const storedFullOrder: OrderItem[] = cartCookies.get('_order')

      setOrderItems(storedFullOrder)

      for (let i = 0; i < storedFullOrder.length; i++) {
        fetchMenuItemByID(storedFullOrder[i].menuItemId).then((data) => {
          setMenuItems((varr) => [...varr, data])
        })
      }
    }
  }, [])

  return (
    <div className="app-container">
      <Navigation url={banner} />

      <div className="ordersContainer">
        <div className="orderBoxContainer">
          <h1>Cart Overview</h1>
          <div className="orderItems">
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
          <div className="orderOverview">
            <div className="genericDetail">
              <h4>Sub total</h4>
              <h4>
                {123}
                <small>€</small>
              </h4>
            </div>
            <div className="genericDetail">
              <h3>Total</h3>
              <h3>
                {123}
                <small>€</small>
              </h3>
            </div>
          </div>
        </div>

        <div className="orderBoxContainer">
          <h1>Special Requests</h1>
          <textarea className="orderNote" placeholder="I have a special request..." />
        </div>
      </div>
    </div>
  )
}
