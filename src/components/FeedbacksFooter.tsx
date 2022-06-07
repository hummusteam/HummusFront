import '../styles/Home.css'
import '../styles/Carousel.css'

import { useState, useEffect } from 'react'
import { fetchFeedbacks } from '../api'
import { Feedback } from '../types'
import { DeleteFeedback } from '.'
import Carousel from 'react-elastic-carousel'

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
]

export default function FeedbacksFooter() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  useEffect(() => {
    fetchFeedbacks().then(setFeedbacks)
  }, [])

  return (
    <div className="App">
      <hr className="seperator" />
      <div className="carousel-wrapper">
        <Carousel isRTL={false} enableAutoPlay autoPlaySpeed={5000} breakPoints={breakPoints}>
          {feedbacks.map((feedback) => (
            <p>Date:{feedback.dateTimeCreated.split('T')[0]}<br/>Review:{feedback.notes}<br/>Score:{feedback.rating}</p>
          ))}
        </Carousel>
      </div>
    </div>
    
  );
}
