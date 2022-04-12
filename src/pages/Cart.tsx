import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Cookies from 'universal-cookie'
import { fetchMenuItemByID } from '../api/MenuItems'
import { Button, Navigation, OrderItemLine } from '../components'
import { MenuItem, OrderItem } from '../types'

type OrderItemElement = {
  orderItem: OrderItem
  menuItem: MenuItem
  qty: number
}

export default function Cart() {
  const banner = 'https://www.nestleprofessionalmena.com/sites/default/files/2020-05/Vision%20banner.png'
  const [orderItemElements, setOrderItemElements] = useState<OrderItemElement[]>([])
  // const router = useRouter()

  useEffect(() => {
    const cartCookies = new Cookies()

    if (cartCookies.get('_order')) {
      const orderItems: OrderItem[] = cartCookies.get('_order')

      orderItems.forEach((orderItem) => {
        fetchMenuItemByID(orderItem.menuItemId).then((data) => {
          setOrderItemElements((varr) => [...varr, { orderItem: orderItem, menuItem: data, qty: 1 }])
        })
      })
    }
  }, [])

  function handleOrderMore() {
    // router.push('/')
  }

  function handleCancelation() {
    window.alert('cancel order')
  }

  return (
    <div className="app-container">
      <Navigation url={banner} />

      <div className="cartRedirectBtns">
        <div onClick={handleOrderMore}>
          <Button text="Order more" />
        </div>
        <div onClick={handleCancelation}>
          <Button text="Cancel my order" />
        </div>
      </div>

      <div className="ordersContainer">
        <div className="orderBoxContainer">
          <h1>Cart Overview</h1>
          <div className="orderItems">
            {orderItemElements &&
              orderItemElements.length != 0 &&
              orderItemElements.map((orderItemElement) => {
                return <OrderItemLine key={orderItemElement.orderItem.id} menuItem={orderItemElement.menuItem} orderItem={orderItemElement.orderItem} />
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
