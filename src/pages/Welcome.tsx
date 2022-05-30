import { useParams } from 'react-router-dom'
import { Button, Navigation } from '../components'
import { useRef, useState } from 'react'
import Cookies from 'universal-cookie'
import '../styles/Welcome.css'
import { fetchSessionByPin, fetchSessionByPinAndTable, putSession } from '../api'
import { Session } from '../types'

export default function Welcome() {
  const { tableId } = useParams()
  const pinRef = useRef(null)
  const tableRef = useRef(null)
  const [error, setError] = useState<string>(null)

  async function joinSession() {
    if (!!tableId) {
      try {
        const bearSession: Session = await fetchSessionByPin(pinRef.current.value)
        console.log(bearSession)
        if (bearSession === ('' as unknown as Session)) {
          throw 'No session found'
        }
        bearSession.table = tableId
        await putSession(bearSession)
      } catch (e) {
        setError('Invalid PIN for table ' + tableId)
      }
    }

    try {
      const properSession: Session = await fetchSessionByPinAndTable(tableRef.current.value, pinRef.current.value)
      if (properSession == null) {
        throw 'No session found'
      }
      setSession(properSession)
    } catch (e) {
      setError('Invalid PIN or table number')
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
      {/* <Navigation /> */}

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
      {error ? <p className="error">{error}</p> : null}
      <br />
      <h3>How does it work?</h3>
      <p>Please enter the 4 digit PIN you were given upon entry and/or a table number if you wish to rejoin a session. You will be redirected to your menu.</p>
      <p>You will be able to join the table with the same PIN.</p>
      <br />
    </div>
  )
}
