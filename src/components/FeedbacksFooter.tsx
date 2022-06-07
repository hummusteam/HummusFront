import '../styles/Home.css'
import '../styles/Carousel.css'
import { useState, useEffect } from 'react'
import { fetchFeedbacks } from '../api'
import { Feedback } from '../types'
import Carousel from 'react-elastic-carousel'

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 3 },
  { width: 768, itemsToShow: 4 },
  { width: 1200, itemsToShow: 6 },
]

export default function FeedbacksFooter() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])

  useEffect(() => {
    fetchFeedbacks().then(setFeedbacks)
  }, [])

  return (
    <div className="carousel-wrapper">
      <h1>Customer feedback</h1>
      <Carousel showEmptySlots={false} isRTL={false} enableAutoPlay autoPlaySpeed={5000} breakPoints={breakPoints} showArrows={false}>
        {feedbacks.map((feedback) => (
          <div className="review">
            {/* <p>{feedback.dateTimeCreated.split('T')[0]}</p> */}
            <p>{feedback.notes}</p>
            <div className="rating">
              {[...Array(Math.round((feedback.rating as unknown as number) / 2))].map((_) => {
                return <img height={10} className="star good" src="https://uploads-ssl.webflow.com/60c8ab76d8eab209d6060807/614c8cf94ea2611db1fcd1ec_star.svg" />
              })}
              {[...Array(5 - Math.round((feedback.rating as unknown as number) / 2))].map((_) => {
                return <img height={10} className="star neutral" src="https://uploads-ssl.webflow.com/60c8ab76d8eab209d6060807/614c8cf94ea2611db1fcd1ec_star.svg" />
              })}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}
