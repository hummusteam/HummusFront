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
