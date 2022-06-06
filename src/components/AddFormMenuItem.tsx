import '../styles/AddForm.css'
import { useRef, useState } from 'react'
import { Button } from '../components'
import { postMenuItem } from '../api'
import { v4 as uuid } from 'uuid'
import moment from 'moment'
import { Ingredient } from '../types'

export default function AddFormMenuItem({ categoryId, ingredients }: { categoryId: string; ingredients: Ingredient[] }) {
  const [addingState, setAddingState] = useState(false)

  let nameInput = useRef(null)
  let priceInput = useRef(null)
  let imageInput = useRef(null)

  const addMenuItem = async () => {
    const selectedIngredients = document.getElementsByClassName('extraIngredient')
    const ingredientsIds: string[] = []

    for (let i = 0; i < selectedIngredients.length; i++) {
      ingredientsIds.push(selectedIngredients[i].id)
    }

    await postMenuItem({
      id: uuid(),
      dateTimeCreated: moment().format(),
      name: nameInput.current.value,
      price: priceInput.current.value === '' ? 0 : priceInput.current.value,
      image: imageInput.current.value,
      category: categoryId,
      ingredientIds: ingredientsIds,
    })

    window.location.reload()
  }

  function handleExtraIngredient(item: Ingredient) {
    document.getElementById(item.id).classList.toggle('extraIngredient')
  }

  return (
    <>
      <div onClick={() => setAddingState(true)} className="add-form-container menu-item">
        <div className="add-form-inner">
          <p>Add a new menu item to this category</p>
        </div>
      </div>

      {addingState ? (
        <>
          <div className="edit-form">
            <h1 className="edit-form-title">Add new menu item</h1>

            <div className="edit-form-inputs">
              <div className="edit-form-label">Dish name</div>
              <input className="edit-form-input" ref={nameInput} placeholder="Something tasty..." />
            </div>

            <div className="edit-form-inputs">
              <div className="edit-form-label">Price</div>
              <input className="edit-form-input" ref={priceInput} placeholder="Your desired price..." />
            </div>

            <div className="edit-form-inputs">
              <div className="edit-form-label">Image URL</div>
              <input className="edit-form-input" ref={imageInput} placeholder="Something recognizable..." />
            </div>

            <div className="edit-form-inputs">
              <div className="edit-form-label">Ingredients</div>

              <div className="menuitem-ingredients">
                {ingredients.map((ingredient) => {
                  return (
                    <div key={ingredient.id} onClick={() => handleExtraIngredient(ingredient)} className="ingredient" id={ingredient.id}>
                      {ingredient.name}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="edit-form-btns">
              <div onClick={() => setAddingState(false)}>
                <Button text={'Cancel'} />
              </div>
              <div onClick={addMenuItem}>
                <Button text={'Create'} />
              </div>
            </div>
          </div>

          <div onClick={() => setAddingState(false)} className="edit-form-block" />
        </>
      ) : null}
    </>
  )
}
