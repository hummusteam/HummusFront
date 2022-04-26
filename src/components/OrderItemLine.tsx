import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import { fetchIngredientById } from '../api'
import '../styles/OrderItemLine.css'
import { Ingredient, MenuItem, OrderItem } from '../types'
import Button from './Button'
import { v4 as uuid } from 'uuid'
import moment from 'moment'

type IngredientElement = {
  ingredient: Ingredient
  qty: number
}

export default function OrderItemLine({ menuItem, orderItem, getPriceFromItem, showBtns = true }: { menuItem: MenuItem; orderItem: OrderItem; getPriceFromItem?: any; showBtns?: boolean }) {
  const [extras, setExtras] = useState<IngredientElement[]>([])
  const [itemQty, setItemQty] = useState<number>(1)
  const cookies = new Cookies()

  useEffect(() => {
    Object.entries(orderItem.extraIngredients).map(async (item) => {
      fetchIngredientById(item[0]).then((data) => {
        setExtras((varr) => [...varr, { ingredient: data, qty: item[1] }])
      })
    })
  }, [])

  useEffect(() => {
    getPriceFromItem(menuItem.price * itemQty)
  }, [])

  function handleAddOrderItem() {
    setItemQty((qty) => (qty += 1))
    getPriceFromItem(menuItem.price)

    const order: OrderItem[] = cookies.get('_order')
    const newOrderItem: OrderItem = {
      id: uuid(),
      dateTimeCreated: moment().format(),
      menuItemId: orderItem.menuItemId,
      allergyId: orderItem.allergyId,
      description: orderItem.description,
      extraIngredients: orderItem.extraIngredients,
    }

    order.push(newOrderItem)
    cookies.set('_order', order)
  }

  function handleRemoveOrderItem() {
    setItemQty((qty) => (qty -= 1))
    getPriceFromItem(-menuItem.price)

    const order: OrderItem[] = cookies.get('_order')

    for (let i = 0; i < order.length; i++) {
      const registeredOrderItem = order[i]

      if (registeredOrderItem.menuItemId == orderItem.menuItemId) {
        order.splice(i, 1)
        break
      }
    }

    cookies.set('_order', order)
  }

  return (
    <>
      {itemQty > 0 ? (
        <div className="orderlineContainer">
          <div className="orderlineDetails">
            <div className="orderlineHeader">
              <h2>
                {itemQty} x {menuItem.name}
              </h2>
              <h2>
                {menuItem.price * itemQty} <small>€</small>
              </h2>
            </div>
            {extras && extras.length != 0 ? (
              <div className="extrasOrderline">
                <b>Extras ingredients</b>
                {extras.map((i) => {
                  return (
                    <div key={i.ingredient.id} className="ingredientItemLine">
                      <div className="ingredientDetailsLine">
                        {i.qty} x {i.ingredient.name}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : null}
            {showBtns && (
              <div className="orderlineBtns">
                <div onClick={handleAddOrderItem}>
                  <Button text="Add" />
                </div>
                <div onClick={handleRemoveOrderItem}>
                  <Button text="Remove" />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  )
}
