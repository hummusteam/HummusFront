import '../styles/EditForm.css'
import { useRef, useState } from 'react'
import { Category } from '../types'
import { Button } from '../components'
import { deleteCategory, putCategory } from '../api'

export default function EditFormCategories(category: Category) {
  const [editingState, setEditingState] = useState(false)

  let nameInput = useRef(null)
  let imageInput = useRef(null)

  async function updateCategory() {
    await putCategory({
      id: category.id,
      dateTimeCreated: category.dateTimeCreated,
      name: nameInput.current.value,
      image: imageInput.current.value,
    })
    window.location.reload()
  }

  async function removeCategory() {
    deleteCategory(category)
    window.location.reload()
  }

  return (
    <>
      {/* <div className="edit-btn-block" /> */}
      <button onClick={(event) => {
        event.preventDefault()
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        setEditingState(true)
      }} type="button" className="edit-btn">
        Edit
      </button>

      {editingState ? (
        <>
          <div className="edit-form">
            <h1 className="edit-form-title">Update category information</h1>

            <div className="edit-form-inputs">
              <div className="edit-form-label">Category name</div>
              <input className="edit-form-input" ref={nameInput} defaultValue={category.name} />
            </div>

            <div className="edit-form-inputs">
              <div className="edit-form-label">Image URL</div>
              <input className="edit-form-input" ref={imageInput} defaultValue={category.image} />
            </div>

            <div className="edit-form-btns">
              <div onClick={() => setEditingState(false)}>
                <Button text={'Cancel'} />
              </div>
              <div onClick={updateCategory}>
                <Button text={'Update'} />
              </div>
              <div onClick={removeCategory}>
                <Button text={'Delete'} />
              </div>
            </div>
          </div>

          <div onClick={() => setEditingState(false)} className="edit-form-block" />
        </>
      ) : null}
    </>
  )
}
