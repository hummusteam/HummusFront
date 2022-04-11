import '../styles/AddForm.css'
import { useRef, useState } from 'react'
import { Button } from '../components'
import { postMenuItem } from '../api'
import { v4 as uuid } from 'uuid'
import moment from 'moment'

export default function AddFormMenuItem({ categoryId }: { categoryId: string }) {
  const [addingState, setAddingState] = useState(false)

  let nameInput = useRef(null)
  let priceInput = useRef(null)
  let imageInput = useRef(null)

  const addMenuItem = async () => {
    await postMenuItem({
      id: uuid(),
      dateTimeCreated: moment().format(),
      name: nameInput.current.value,
      price: priceInput.current.value,
      image: imageInput.current.value,
      category: categoryId,
      ingredientIds: [''],
    })
    window.location.reload()
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