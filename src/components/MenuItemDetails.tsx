import '../styles/MenuItemDetails.css'
import { useEffect, useRef, useState } from 'react'
import { Ingredient, MenuItem } from '../types'
import { fetchIngredientById } from '../api'
import Button from './Button'
import Cookies from 'universal-cookie'
import OrderItem from '../types/OrderItem'
import { v4 as uuid } from 'uuid'

export default function MenuItemDetails(item: MenuItem) {
  const [isShowing, showDetails] = useState(false)
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  let unwantedIngredients: Ingredient[] = []

  useEffect(() => {
    const ingredients: Ingredient[] = getIngredientsFromItem()
    setIngredients(ingredients)
  }, [])

  function getIngredientsFromItem(): Ingredient[] {
    let ingredients: Ingredient[] = []
    item.ingredientIds.forEach(async (i) => {
      let ingredient = await fetchIngredientById(i)
      ingredients.push(ingredient)
    })
    return ingredients
  }

  function handleExtraIngredient(item: Ingredient): void {
    document.getElementById(item.id).classList.toggle('extraIngredient')
    if (!unwantedIngredients.includes(item)) {
      unwantedIngredients.push(item)
    } else {
      unwantedIngredients = unwantedIngredients.filter((ele) => {
        return ele != item
      })
    }
  }

  function addMenuItem() {
    // Getting clicked items under Etra Ingredients to a list `extras`
    const ingredientElements = document.getElementsByClassName('extraIngredient')

    let extras: { [id: string]: number } = {}

    for (let i = 0; i < ingredientElements.length; i++) {
      extras[ingredientElements[i].id] = 1 // currently adds 1 bc not fully implemented
    }

    // Configure an OrderItem obj as `configuredOrder`
    const configuredOrder: OrderItem = {
      id: uuid(),
      dateTimeCreated: item.dateTimeCreated,
      menuItemId: item.id,
      allergyId: null,
      extraIngredients: extras,
      description: '',
    }

    // Create cookie with order item. Check if orders already added
    const cookies = new Cookies()

    if (cookies.get('_order')) {
      // Deserialize object from cookie using casting
      const order: OrderItem[] = cookies.get('_order')
      order.push(configuredOrder)
      cookies.set('_order', JSON.stringify(order))
      console.log(order)
    } else {
      cookies.set('_order', JSON.stringify([configuredOrder]))
    }

    document.location.reload()
  }

  return (
    <>
      <div className="details-form-interact" onClick={() => showDetails(true)} />

      {isShowing ? (
        <>
          <div className="details-form">
            <div className="details-grid">
              <img className="details-image-container" src={item.image} />
              <div className="details-form-details">
                <p className="details-form-title">{item.name}</p>
                <p className="details-form-detail">{item.price} €</p>
                {ingredients != null && ingredients.length != 0 ? (
                  <>
                    <h3>Extra ingredients</h3>
                    <div className="details-form-ingredients">
                      {ingredients.map((i) => {
                        return (
                          <div onClick={() => handleExtraIngredient(i)} id={i.id} className="ingredient" key={i.id}>
                            {i.name}
                          </div>
                        )
                      })}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
            <div className="details-form-btns">
              <div onClick={addMenuItem}>
                <Button text="Add to cart" />
              </div>
              <div onClick={() => showDetails(false)}>
                <Button text="Cancel" />
              </div>
            </div>
          </div>

          <div className="details-form-block" onClick={() => showDetails(false)} />
        </>
      ) : null}
    </>
  )
}
