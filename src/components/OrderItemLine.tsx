import { useEffect, useState } from 'react'
import { fetchIngredientById } from '../api'
import '../styles/OrderItemLine.css'
import { Ingredient, MenuItem, OrderItem } from '../types'
import Button from './Button'

type IngredientElement = {
  ingredient: Ingredient
  qty: number
}

export default function OrderItemLine({ menuItem, orderItem, getPriceFromItem }: { menuItem: MenuItem; orderItem: OrderItem; getPriceFromItem: any }) {
  const [extras, setExtras] = useState<IngredientElement[]>([])
  const [itemQty, setItemQty] = useState<number>(1)

  useEffect(() => {
    Object.entries(orderItem.extraIngredients).map(async (item) => {
      fetchIngredientById(item[0]).then((data) => {
        setExtras((varr) => [...varr, { ingredient: data, qty: item[1] }])
      })
    })

    console.log(itemQty)
  }, [])

  useEffect(() => {
    if (itemQty == 0) {
      getPriceFromItem(-menuItem.price)
    } else {
      getPriceFromItem(menuItem.price * itemQty)
    }
  }, [itemQty])

  function handleAddOrderItem() {
    setItemQty((qty) => (qty += 1))
  }

  function handleRemoveOrderItem() {
    setItemQty((qty) => (qty -= 1))
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
            <div className="orderlineBtns">
              <div onClick={handleAddOrderItem}>
                <Button text="Add" />
              </div>
              <div onClick={handleRemoveOrderItem}>
                <Button text="Remove" />
              </div>
            </div>
          </div>
          <hr />
        </div>
      ) : null}
    </>
  )
}
