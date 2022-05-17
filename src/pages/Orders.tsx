import { useEffect, useState } from 'react'
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { MenuItem, Order, ProperIngredient, ProperOrder, ProperOrderItem } from '../types'
import { fetchAllOrders, fetchIngredientById, fetchMenuItemById, updateOrder } from '../api'
import OrderCard from '../components/OrderCard'
import '../styles/Orders.css'

export default function Orders() {
  const [connection, setConnection] = useState<HubConnection>(null)
  const [orders, setOrders] = useState<ProperOrder[]>([])

  useEffect(() => {
    const newConnection = new HubConnectionBuilder().withUrl('https://orderapi.tycho.dev/orderhub').withAutomaticReconnect().build()
    setConnection(newConnection)

    fetchAllOrders().then(async (fetchedOrders: Order[]) => {
      for (const order of fetchedOrders) {
        if (order.orderStatus != 2) {
          const pasredOrder = await convertOrderToProper(order)
          setOrders((arr) => [...arr, pasredOrder])
        }
      }
    })
  }, [])

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on('OrderNew', async (newOrder: Order) => {
            const pasredOrder = await convertOrderToProper(newOrder)
            setOrders((arr) => [...arr, pasredOrder])
          })
        })
        .catch(console.log)
    }
  }, [connection])

  function handleUpdateStatus(order: Order) {
    updateOrder(order)
  }

  async function convertOrderToProper(order: Order): Promise<ProperOrder> {
    const parsedOrderItems: ProperOrderItem[] = []

    for (const item of order.orderItems) {
      let menuItem: MenuItem = null
      try {
        menuItem = await fetchMenuItemById(item.menuItemId)
      } catch (e) {}

      const extras: ProperIngredient[] = []
      for (const [key, value] of Object.entries(item.extraIngredients)) {
        try {
          extras.push({
            ingredient: await fetchIngredientById(key),
            qty: value,
          })
        } catch (e) {
          console.log(e)
        }
      }

      parsedOrderItems.push({
        id: item.id,
        dateTimeCreated: item.dateTimeCreated,
        menuItem: menuItem,
        allergyId: item.allergyId,
        description: item.description,
        extraIngredients: extras,
      })
    }

    return {
      id: order.id,
      original: order,
      dateTimeCreated: order.dateTimeCreated,
      orderItems: parsedOrderItems,
      orderStatus: order.orderStatus,
      description: order.description,
    }
  }

  return (
    <div className="app-container">
      <div className="orders">
        <div className="container-kds-inprep">
          {orders &&
            orders.map((order, i) => {
              return <OrderCard onStatusUpdate={(order: Order) => handleUpdateStatus(order)} key={order.id} index={orders.length - i} properOrder={order} />
            })}
        </div>
      </div>
    </div>
  )
}
