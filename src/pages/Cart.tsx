import '../styles/Cart.css'
import { useState, useEffect, useRef } from 'react'
import Cookies from 'universal-cookie'
import { fetchMenuItemById } from '../api'
import { redirectToPaymnetWithId } from '../api/Payment'
import { Button, Meta, Navigation, OrderItemLine } from '../components'
import { MenuItem, Order, OrderItem, Session, SessionOrders } from '../types'
import { v4 as uuid } from 'uuid'
import moment from 'moment'
import { placeOrder } from '../api'
import { fetchSessionOrders } from '../api'
import { Link } from 'react-router-dom'

type OrderItemElement = {
  orderItem: OrderItem
  menuItem: MenuItem
  qty: number
}

type PreviousOrderItemElements = {
  orderId: string
  orderItemElements: OrderItemElement[]
  since: number
  totalPrice: number
}

export default function Cart() {
  const [orderItemElements, setOrderItemElements] = useState<OrderItemElement[]>([])
  const [orderItemsSum, setOrderItemsSum] = useState<number>(0)
  const [prevOrders, setPrevOrders] = useState<PreviousOrderItemElements[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const cookies = new Cookies()
  const desc = useRef(null)
  const session: Session = cookies.get('_session')

  useEffect(() => {
    if (session) {
      if (cookies.get('_order')) {
        const orderItems: OrderItem[] = cookies.get('_order')

        orderItems.forEach((orderItem) => {
          fetchMenuItemById(orderItem.menuItemId).then((data) => {
            setOrderItemElements((varr) => [...varr, { orderItem, menuItem: data, qty: 1 }])
          })
        })
      }

      fetchSessionOrders(session?.id).then(async (data: SessionOrders) => {
        setTotalPrice(data.totalAmount)

        for (const order of data.orders) {
          let prevOrderItems: OrderItemElement[] = []

          for (const orderItem of order.orderItems) {
            const menuItem = await fetchMenuItemById(orderItem.menuItemId)
            prevOrderItems.push({ orderItem, menuItem, qty: 1 })
          }

          let totalSum = prevOrderItems.map(o => o.qty * o.menuItem.price).reduce((a, b) => a + b)

          let orderTs = Date.parse(order.dateTimeCreated)
          let currentTs = Date.now()
          let diff = Math.floor((currentTs - orderTs) / (1000 * 60 * 60))

          let prevOrder: PreviousOrderItemElements = {
            orderId: order.id,
            orderItemElements: prevOrderItems,
            since: diff,
            totalPrice: totalSum,
          }

          setPrevOrders((varr) => [...varr, prevOrder])
        }
      })
    }
  }, [])

  function handleCancelation() {
    cookies.remove('_order')
    cookies.remove('_session')
    window.location.replace('/')
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
      <Navigation />
      <Meta />

      <div className="ordersContainer">
        <div className="orderBoxContainer">
          <h1>Cart Overview</h1>
          {orderItemElements.length != 0 ? (
            <>
              <div className="orderItems">
                {orderItemElements &&
                  orderItemElements.length != 0 &&
                  orderItemElements.map((orderItemElement) => {
                    return <OrderItemLine key={orderItemElement.orderItem.id} menuItem={orderItemElement.menuItem} orderItem={orderItemElement.orderItem} getPriceFromItem={getPriceFromItem} />
                  })}
              </div>

              <h1>Special Requests</h1>
              <textarea ref={desc} className="orderNote" placeholder="I have a special request..." />

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

              <div className="cartContainerBtns">
                <div onClick={handleSubmission}>
                  <Button text="Place my order!" />
                </div>
                <Link to={'/'}>
                  <Button text="Order more" />
                </Link>
                <div onClick={handleCancelation}>
                  <Button text="Cancel" />
                </div>
              </div>
            </>
          ) : (
            <h3 className="prompt">No items</h3>
          )}
        </div>

        <div className="orderBoxContainer">
          <h1>Previous Orders</h1>
          {prevOrders.length != 0 ? (
            <>
              <div className="orderItems">
                {prevOrders.map((order, x, xarr) => {
                  return (
                    <div key={order.orderId}>
                      <div className="genericDetail">
                        <h3>Order #{x + 1}</h3>
                        <h3>{order.since} mins ago</h3>
                      </div>
                      {/* {order.orderItemElements?.map((orderItem, i, arr) => {
                        return (
                          <>
                            <OrderItemLine key={uuid()} menuItem={orderItem.menuItem} orderItem={orderItem.orderItem} showBtns={false} />
                            {i + 1 != arr.length && <hr />}
                          </>
                        )
                      })} */}
                      <div className="genericDetail">
                        <h3>Total</h3>
                        <h3>{Math.round(order.totalPrice * 1.05 * 100) / 100} &euro;</h3>
                      </div>
                      {x + 1 != xarr.length && <hr />}
                    </div>
                  )
                })}
              </div>

              <div className="orderOverview">
                <div className="genericDetail">
                  <h3>Sub total</h3>
                  <h3>{totalPrice! ?? 0} &euro;</h3>
                </div>

                <div className="genericDetail">
                  <h2>Total</h2>
                  <h2>{totalPrice! ? Math.round((totalPrice! * 1.05 * 100) / 100) : 0} &euro;</h2>
                </div>
              </div>

              <div className="cartContainerBtns">
                <div onClick={async () => await redirectToPaymnetWithId(session?.id)}>
                  <Button text="Confirm and pay" />
                </div>
              </div>
            </>
          ) : (
            <h3 className="prompt">No previous orders</h3>
          )}
        </div>
      </div>
    </div>
  )
}
