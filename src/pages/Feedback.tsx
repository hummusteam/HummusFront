import '../styles/Home.css'
import { DeleteFeedback, Navigation } from '../components'
import { useState, useEffect } from 'react'
import { fetchFeedbacks } from '../api'
import { Feedback } from '../types'

export default function Feedbacks() {
  const [feedbacks, setFeedback] = useState<Feedback[]>([])
  useEffect(() => {
    fetchFeedbacks().then(setFeedback)
  }, [])

  return (
    <div className="app-container ">
      <Navigation />

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
                <DeleteFeedback {...f}/>
              </div>
            )
          })}
      </div>
    </div>
  )
}
