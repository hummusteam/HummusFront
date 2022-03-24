import '../styles/AddForm.css'
import { useRef, useState } from 'react'
import { Button } from '../components'
import { postCategory } from '../api'
import { v4 as uuid } from 'uuid'
import moment from 'moment'

export default function AddFormCategory() {
  const [addingState, setAddingState] = useState(false)

  let nameInput = useRef(null)
  let imageInput = useRef(null)

  const addCategory = async () => {
    await postCategory({
      id: uuid(),
      dateTimeCreated: moment().format(),
      name: nameInput.current.value,
      image: imageInput.current.value,
    })
    window.location.reload()
  }

  return (
    <>
      <div onClick={() => setAddingState(true)} className="add-form-container category">
        <div className="add-form-inner">
          <p>Add a new category to your restaurant</p>
        </div>
      </div>

      {addingState ? (
        <>
          <div className="edit-form">
            <h1 className="edit-form-title">Add new category</h1>

            <div className="edit-form-inputs">
              <div className="edit-form-label">Category name</div>
              <input className="edit-form-input" ref={nameInput} placeholder="Something exsiting..." />
            </div>

            <div className="edit-form-inputs">
              <div className="edit-form-label">Image URL</div>
              <input className="edit-form-input" ref={imageInput} placeholder="Something recognizable..." />
            </div>

            <div className="edit-form-btns">
              <div onClick={() => setAddingState(false)}>
                <Button text={'Cancel'} />
              </div>
              <div onClick={addCategory}>
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
