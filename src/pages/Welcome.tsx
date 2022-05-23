import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { startSession } from '../api/Sessions'
import Cookies from 'universal-cookie'
import '../styles/Welcome.css'
import { Button } from '../components'

export default function Welcome() {
  const { tableId } = useParams()

  // useEffect(() => {
  //   startSession(tableId).then((session) => {
  //     const cookies = new Cookies()
  //     cookies.remove('_session')
  //     cookies.remove('_order')
  //     cookies.set('_session', session, { path: '/' })
  //     window.location.replace('/')
  //   })
  // }, [])

  return (
    <div className="pin-form">
      <h1>Welcome</h1>
      <br />
      <div className="input">
        <label htmlFor="pin">4-digit PIN</label>
        <input className="edit-form-input" name="pin" id="pin" />
      </div>
      <br />
      <Button text='Verify' />
      <br />
      <br />
      <h3>How does it work?</h3>
      <p>Please enter the pin you were given upon entry. You will be redirected to your menu.</p>
      <p>You will be able to join the table with the same pin.</p>
    </div>
  )
}
