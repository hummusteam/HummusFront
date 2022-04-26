import '../styles/Cart.css'
import { useState, useEffect, useRef } from 'react'
import Cookies from 'universal-cookie'
import { fetchMenuItemByID } from '../api/MenuItems'
import { redirectToPaymnetWithId } from '../api/Payment'
import { Button, Navigation, OrderItemLine } from '../components'
import { MenuItem, Order, OrderItem, Session, SessionOrders } from '../types'
import { v4 as uuid } from 'uuid'
import moment from 'moment'
import { placeOrder } from '../api/Order'
import { getSessionOrders } from '../api'
import {Link} from "react-router-dom";

type OrderItemElement = {
  orderItem: OrderItem
  menuItem: MenuItem
  qty: number
}

export default function Cart() {
  const banner = 'https://www.nestleprofessionalmena.com/sites/default/files/2020-05/Vision%20banner.png'
  const [orderItemElements, setOrderItemElements] = useState<OrderItemElement[]>([])
  const [orderItemsSum, setOrderItemsSum] = useState<number>(0)
  const [prevOrders, setPrevOrders] = useState<SessionOrders>()
  const cookies = new Cookies()
  const desc = useRef(null)
  const session: Session = cookies.get('_session')
  
  
  useEffect(() => {
    if (cookies.get('_order')) {
      const orderItems: OrderItem[] = cookies.get('_order')

      orderItems.forEach((orderItem) => {
        fetchMenuItemByID(orderItem.menuItemId).then((data) => {
          setOrderItemElements((varr) => [...varr, { orderItem: orderItem, menuItem: data, qty: 1 }])
        })
      })
    }

    getSessionOrders(session?.id).then(setPrevOrders)
  }, [])

  function handleOrderMore() {
    window.location.replace('/')
  }

  function handleCancelation() {
    cookies.remove('_order')
    window.location.replace('/')

    // delete session on cancelation
  }

  function getPriceFromItem(amount: number) {
    setOrderItemsSum((sum) => {
      return Math.round((sum += amount) * 100) / 100
    })
  }

  function handleSubmission() {
    const session: Session = cookies.get('_session')
    if (!session) {
      window.alert('Please scan a QR code on the table.')
    } else {
      const orderItems: OrderItem[] = cookies.get('_order')
      if (!orderItems) {
        window.alert('No items found. Choose something from the menu.')
      } else {
        const order: Order = {
          id: uuid(),
          dateTimeCreated: moment().format(),
          orderItems: orderItems,
          orderStatus: 0,
          description: desc.current.value,
        }

        placeOrder(session.id, order)
          .then(() => {
            window.alert('Order has been place!')
            cookies.remove('_order')
            window.location.reload()
          })
          .catch(() => {
            window.alert('An error occured, sorry about that.')
          })
      }
    }
  }

  return (
    <div className="app-container">
      <Navigation url={banner} />

      <div className="ordersContainer">
        <div className="orderBoxContainer">
          <h1>Cart Overview</h1>
          <div className="orderItems">
            {orderItemElements &&
              orderItemElements.length != 0 &&
              orderItemElements.map((orderItemElement) => {
                return <OrderItemLine getPriceFromItem={getPriceFromItem} key={orderItemElement.orderItem.id} menuItem={orderItemElement.menuItem} orderItem={orderItemElement.orderItem} />
              })}
          </div>

          <div className="orderOverview">
            <div className="genericDetail">
              <h3>Sub total</h3>
              <h3>{orderItemsSum} &euro;</h3>
            </div>

            <div className="genericDetail">
              <h2>Total</h2>
              <h2>{Math.round(orderItemsSum * 1.05 * 100) / 100} &euro;</h2>
            </div>
          </div>
        </div>

        <div className="orderBoxContainer">
          <h1>Special Requests</h1>
          <textarea ref={desc} className="orderNote" placeholder="I have a special request..." />
        </div>

        <div className="orderBoxContainer">
          <h1>Previous orders</h1>
          {prevOrders?.orders ? (
            prevOrders?.orders.map((order) => {
              return (
                <>
                  <p>{order.dateTimeCreated}</p>
                  <p>{order.orderStatus}</p>
                </>
              )
            })
          ) : (
            <p>No previous orders placed</p>
          )}
          <div className="genericDetail">
            <h3>Total paid</h3>
            <h3>{prevOrders?.totalAmount ?? 0} &euro;</h3>
          </div>
        </div>
      </div>

      <div className="cartRedirectBtns">
        <Link to={'/'}>
          <Button text="Order more" />
        </Link>
        <div onClick={handleCancelation}>
          <Button text="Cancel my order" />
        </div>
        <div onClick={handleSubmission}>
          <Button text="Place my order!" />
        </div>
        <div onClick={async () => await redirectToPaymnetWithId(session?.id)}>
          <Button text="Pay!" />
        </div>
      </div>
    </div>
  )
}
