import '../styles/EditForm.css'
import { MouseEvent, useRef, useState } from 'react'
import { MenuItem } from '../types'
import { Button } from '../components'
import { deleteMenuItem, putMenuItem } from '../api'

export default function EditFormMenuItem(menuItem: MenuItem) {
  const [editingState, setEditingState] = useState(false)

  let nameInput = useRef(null)
  let priceInput = useRef(null)
  let imageInput = useRef(null)

  async function updateMenuItem() {
    await putMenuItem({
      id: menuItem.id,
      dateTimeCreated: menuItem.dateTimeCreated,
      name: nameInput.current.value,
      price: priceInput.current.value,
      image: imageInput.current.value,
      category: menuItem.category,
      ingredientIds: menuItem.ingredientIds,
    })
    window.location.reload()
  }

  async function removeMenuItem() {
    await deleteMenuItem(menuItem)
    window.location.reload()
  }

  function handleClick(event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) {
    event.stopPropagation()
    setEditingState(true)
  }

  return (
    <>
      {/* <div className="edit-btn-block" /> */}
      <button onClick={(event) => handleClick(event)} type="button" className="edit-btn">
        Edit
      </button>

      {editingState ? (
        <form>
          <div className="edit-form">
            <h1 className="edit-form-title">Update menu item information</h1>

            <div className="edit-form-inputs">
              <div className="edit-form-label">Dish name</div>
              <input className="edit-form-input" ref={nameInput} defaultValue={menuItem.name} />
            </div>

            <div className="edit-form-inputs">
              <div className="edit-form-label">Price</div>
              <input className="edit-form-input" ref={priceInput} defaultValue={menuItem.price} />
            </div>

            <div className="edit-form-inputs">
              <div className="edit-form-label">Image URL</div>
              <input className="edit-form-input" ref={imageInput} defaultValue={menuItem.image} />
            </div>

            <div className="edit-form-btns">
              <div onClick={() => setEditingState(false)}>
                <Button text={'Cancel'} />
              </div>
              <div onClick={updateMenuItem}>
                <Button text={'Update'} />
              </div>
              <div onClick={removeMenuItem}>
                <Button text={'Delete'} />
              </div>
            </div>
          </div>
          <div onClick={() => setEditingState(false)} className="edit-form-block" />
        </form>
      ) : null}
    </>
  )
}
