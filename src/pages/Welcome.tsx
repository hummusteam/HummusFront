import { useParams } from 'react-router-dom'
import { joinTableSession } from '../api'
import { Button } from '../components'
import { useRef } from 'react'
import Cookies from 'universal-cookie'
import '../styles/Welcome.css'
import { enterSession, putSession } from '../api'
import { Session } from '../types'

export default function Welcome() {
  const { tableId } = useParams()
  const pinRef = useRef(null)
  const tableRef = useRef(null)

  async function joinSession() {
    if (!tableId) {
      const bearSession = await enterSession(pinRef.current.value)
      bearSession.table = tableRef.current.value
      putSession(bearSession).then(setSession)
    } else {
      joinTableSession(tableRef.current.value, pinRef.current.value).then(setSession)
    }
  }

  function setSession(session: Session) {
    const cookies = new Cookies()
    cookies.remove('_session')
    cookies.remove('_order')
    cookies.set('_session', session, { path: '/' })
    window.location.replace('/')
  }

  return (
    <div className="pin-form">
      <h1>Welcome</h1>
      <br />
      <div className="input">
        <label htmlFor="pin">Enter PIN</label>
        <input ref={pinRef} className="edit-form-input" name="pin" id="pin" />
      </div>
      <div className="input">
        <label htmlFor="table">Table number</label>
        <input ref={tableRef} defaultValue={tableId} className="edit-form-input" name="table" id="table" disabled={!!tableId} />
      </div>
      <br />
      <div onClick={joinSession}>
        <Button text="Enter menu" />
      </div>
      <br />
      <h3>How does it work?</h3>
      <p>Please enter the 4 digit PIN you were given upon entry and/or a table number if you wish to rejoin a session. You will be redirected to your menu.</p>
      <p>You will be able to join the table with the same PIN.</p>
      <br />
    </div>
  )
}
