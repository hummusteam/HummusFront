import { useEffect, useState } from 'react'
import OrderCard from '../components/OrderCard'
import '../styles/Orders.css'
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { Ingredient, MenuItem, Order } from '../types'
import { fetchAllOrders } from '../api/Order'
import { fetchMenuItemById, fetchIngredientById } from '../api'

interface ProperOrder {
  id: string
  dateTimeCreated: string
  orderItems: ProperOrderItem[]
  orderStatus: number
  description: string
}

interface ProperOrderItem {
  id: string
  dateTimeCreated: string
  menuItem: MenuItem
  allergyId: string[]
  description: string
  extraIngredients: ProperIngredient[]
}

interface ProperIngredient {
  ingredient: Ingredient
  qty: number
}

export default function Orders() {
  const [connection, setConnection] = useState<HubConnection>(null)
  const [orders, setOrders] = useState<ProperOrder[]>()

  // useEffect(() => {
  //   const newConnection = new HubConnectionBuilder().withUrl('https://orderapi.tycho.dev/orderhub').withAutomaticReconnect().build()
  //   setConnection(newConnection)

  //   fetchAllOrders().then((orders: Order[]) => {
  //     orders.forEach((order: Order) => {
  //       convertOrderToProper(order)
  //       // setOrders((orders) => [...orders, convertOrderToProper(order)])
  //     })
  //   })
  // }, [])

  // useEffect(() => {
  //   if (connection) {
  //     connection
  //       .start()
  //       .then(() => {
  //         console.log('Connected!')
  //         connection.on('OrderNew', (order: Order) => {
  //           if (order) {
  //             setOrders((orders) => [...orders, convertOrderToProper(order)])
  //           }
  //         })
  //       })
  //       .catch((e) => console.log('Connection failed: ', e))
  //   }
  // }, [connection])

  function convertOrderToProper(order: Order): ProperOrder {
    let parsedOrderItems: ProperOrderItem[] = []

    order.orderItems.forEach(async (item) => {
      let extras: ProperIngredient[] = []
      let menuItem: MenuItem = null
      let parsedOrderItem: ProperOrderItem

      try {
        menuItem = await fetchMenuItemById(item.menuItemId)
      } catch (e) {}

      for (const [key, value] of Object.entries(item.extraIngredients)) {
        let extraIngredient: ProperIngredient = null

        try {
          extraIngredient = {
            ingredient: await fetchIngredientById(key),
            qty: value,
          }
        } catch (e) {}

        extras.push(extraIngredient)
      }

      parsedOrderItem = {
        id: item.id,
        dateTimeCreated: item.dateTimeCreated,
        menuItem: menuItem,
        allergyId: item.allergyId,
        description: item.description,
        extraIngredients: extras,
      }

      parsedOrderItems.push(parsedOrderItem)
    })

    let parsedOrder: ProperOrder = {
      id: order.id,
      dateTimeCreated: order.dateTimeCreated,
      orderItems: parsedOrderItems,
      orderStatus: order.orderStatus,
      description: order.description,
    }

    console.log(parsedOrder)
    return parsedOrder
  }

  return (
    <>
      <div className="container-kds">
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </div>
    </>
  )
}
