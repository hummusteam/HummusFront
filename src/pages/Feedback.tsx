import '../styles/Home.css'
import { DeleteFeedback, Navigation } from '../components'
import { useState, useEffect, useRef } from 'react'
import { fetchFeedbacks, postFeedback } from '../api'
import { Feedback } from '../types'

export default function Feedbacks() {
  const [feedbacks, setFeedback] = useState<Feedback[]>([])
  useEffect(() => {
    fetchFeedbacks().then(setFeedback)
  }, [])

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  const istoday = yyyy + '-' + mm + '-' + dd;

  let ratingInput = useRef(null)
  let notesInput = useRef(null)
  let sessionIdInput = useRef(null)


  async function createFeedback() {
    console.log(istoday)
    await postFeedback({
      dateTimeCreated: istoday + "",
      rating: ratingInput.current.value,
      notes: notesInput.current.value,
      sessionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    })
    window.location.replace("/welcome")
  }

  return (
    <div className="app-container ">
      <Navigation />

      <div>
        <div className="create-form">Rating</div>
        <input className="create-form-input" ref={ratingInput} />

        <div className="create-form">Notes</div>
        <input className="create-form-input" ref={notesInput} />

        <div onClick={createFeedback}>Create</div>
      </div>

      <div className="app-canvas">
        {feedbacks.length &&
          feedbacks.map((f) => {
            const splitted = f.dateTimeCreated.split('T')[0]

            return (
              <div>
                <h1>{splitted}</h1>
                <p className="carousel-item">{splitted}</p>
                <p className="carousel-item">Rating: {f.rating}</p>
                <p className="carousel-item">Review: {f.notes}</p>
                <DeleteFeedback {...f} />
              </div>
            )
          })}
      </div>
    </div>
  )
}
