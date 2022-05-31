import '../styles/Home.css'
import { Navigation } from '../components'
import { useState, useEffect } from 'react'
import { fetchFeedbacks } from '../api'
import { Feedback} from '../types'

export default function Feedbacks() {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
    useEffect(() => {
        fetchFeedbacks().then(setFeedbacks)
    }, [])
  
    return (
      <div className="app-container ">
        <Navigation />
  
        <div className="app-canvas">
          {feedbacks.length &&
            feedbacks.map((f) => {
              return (
                <div>
                  <h1>{f.dateTimeCreated}</h1>
                  <p>Raing: {f.rating}</p>
                  <p>Notes: {f.notes} $</p>
                </div>
              )
            })}
        </div>
      </div>
    )
  }
  