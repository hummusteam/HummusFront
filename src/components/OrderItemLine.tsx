import { useEffect, useState } from 'react'
import { fetchIngredientById } from '../api'
import '../styles/OrderItemLine.css'
import { Ingredient, MenuItem, OrderItem } from '../types'
import Button from './Button'

type IngredientElement = {
  ingredient: Ingredient
  qty: number
}

export default function OrderItemLine({ menuItem, orderItem }: { menuItem: MenuItem; orderItem: OrderItem }) {
  const [extras, setExtras] = useState<IngredientElement[]>([])
  const qty = 1

  useEffect(() => {
    Object.entries(orderItem.extraIngredients).map(async (item) => {
      fetchIngredientById(item[0]).then((data) => {
        setExtras((varr) => [...varr, { ingredient: data, qty: item[1] }])
      })
    })
  }, [])

  return (
    <div className="orderlineContainer">
      <div className="orderlineDetails">
        <div className="orderlineHeader">
          <h2>
            {qty} x {menuItem.name}
          </h2>
          <h2>
            {menuItem.price * qty} <small>€</small>
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
        <div className="orderlineBtns">
          <Button text="Add" />
          <Button text="Remove" />
        </div>
      </div>
      <hr />
    </div>
  )
}
