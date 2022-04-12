import { useEffect, useState } from 'react'
import { fetchIngredientById } from '../api'
import '../styles/OrderItemLine.css'
import { MenuItem, OrderItem } from '../types'
import Button from './Button'

export default function OrderItemLine({ menuItem, orderItem }: { menuItem: MenuItem; orderItem: OrderItem }) {
  const [extras, setExtras] = useState<MenuItem[]>([])
  const qty = 1

  useEffect(() => {
    Object.entries(orderItem.extraIngredients).map(async (item) => {
      fetchIngredientById(item[0]).then((data) => {
        setExtras((varr) => [...varr, data])
      })
    })
  }, [])

  return (
    <div className="orderlineContainer">
      <div className="orderlineDetails">
        <div className="orderlineHeader">
          <h3>
            {qty} x {menuItem.name}
          </h3>
          <h3>
            {menuItem.price * qty} <small>€</small>
          </h3>
        </div>
        {extras.length != 0 ? (
          <div className="extrasOrderline">
            <b>Extras ingredients</b>
            {extras.map((i) => {
              return Object.entries(orderItem.extraIngredients).map((o) => {
                return o[0] == i.id ? (
                  <div key={i.id} className="ingredientItemLine">
                    <div className="ingredientDetailsLine">
                      {o[1]} x {i.name}
                    </div>
                  </div>
                ) : null
              })
            })}
          </div>
        ) : null}
        <div className="orderlineBtns">
          <Button text="Add" />
          <Button text="Remove" />
        </div>
      </div>
      <hr />
    </div>
  )
}
