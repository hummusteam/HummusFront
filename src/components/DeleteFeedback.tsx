import '../styles/EditForm.css'
import { useState } from 'react'
import { Feedback } from '../types'
import { deleteFeedback } from '../api'
import Button from './Button'

export default function DeleteFeedback(feedback: Feedback) {
  const [editingState, setEditingState] = useState(false)

  async function removeFeedback() {
    await deleteFeedback(feedback)
    window.location.reload()
  }

  return (
    <>
      <div onClick={() => setEditingState(true)}>Delete</div>

      {editingState ? (
        <form>
          <div className="edit-form">
            <div className="edit-form-inputs">
              <div className="edit-form-label">Are you sure?</div>
            </div>

            <div className="edit-form-btns">
              <div onClick={() => setEditingState(false)}>
                <Button text={'Cancel'} />
              </div>
              <div onClick={removeFeedback}>
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
