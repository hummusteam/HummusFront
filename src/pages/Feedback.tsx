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
                <div className="rating">
                  {[...Array(Math.round((f.rating as unknown as number) / 2))].map((_) => {
                    return <img height={10} className="star good" src="https://uploads-ssl.webflow.com/60c8ab76d8eab209d6060807/614c8cf94ea2611db1fcd1ec_star.svg" />
                  })}
                  {[...Array(5 - Math.round((f.rating as unknown as number) / 2))].map((_) => {
                    return <img height={10} className="star neutral" src="https://uploads-ssl.webflow.com/60c8ab76d8eab209d6060807/614c8cf94ea2611db1fcd1ec_star.svg" />
                  })}
                </div>
                <p className="carousel-item">{f.notes}</p>
                <DeleteFeedback {...f} />
              </div>
            )
          })}
      </div>
    </div>
  )
}
