import '../styles/EditableForm.css'
import { useState } from 'react'
import { Editable } from '../types'
import Button from './Button'

export default function EditableForm<T extends Editable>(obj: T) {
  const [editingState, setEditingState] = useState(false)

  const updateObj = () => {
    
  }

  return (
    <>
      {/* <div className="edit-btn-block" /> */}
      <button onClick={() => setEditingState(true)} type="button" className="edit-btn">
        Edit
      </button>

      {editingState ? (
        <>
          <div className="edit-form">
            <h1 className="edit-form-title">Update information</h1>
            {Object.values(obj).map((data) =>
              Object.entries(data.data).map((value) => (
                <div className="edit-form-inputs">
                  <div className="edit-form-label" key={value[0] as string}>
                    {value[0].charAt(0).toUpperCase() + value[0].slice(1)}
                  </div>
                  <input className="edit-form-input" key={value[1] as string} defaultValue={value[1] as string} />
                </div>
              ))
            )}
            <div className="edit-form-btns">
              <div onClick={() => setEditingState(false)}>
                <Button text={'Cancel'} />
              </div>
              <div onClick={updateObj}>
                <Button text={'Update'} />
              </div>
              <div onClick={() => null}>
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
