import { useParams } from 'react-router-dom'
import { Button } from '../components'
import { useRef, useState } from 'react'
import Cookies from 'universal-cookie'
import '../styles/Welcome.css'
import { fetchSessionByPin, fetchSessionByPinAndTable, putSession } from '../api'
import { Ingredient, Session } from '../types'

export default function Welcome() {
  const { tableId } = useParams()
  const pinRef = useRef(null)
  const tableRef = useRef(null)
  const [error, showError] = useState<boolean>(false)

  async function joinSession() {
    // const updatedSession : Session = await fetchSessionByPinAndTable() // <- if joining table, not creating new session

    try {
      const bearSession: Session = await fetchSessionByPin(pinRef.current.value)
      if (bearSession === '' as unknown as Session) {
      }
      bearSession.table = tableRef.current.value
      await putSession(bearSession)
      // fetching proper session data from backend instead of reusing `bearSession`
      const updatedSession : Session = await fetchSessionByPinAndTable(tableRef.current.value, pinRef.current.value)
      setSession(updatedSession)
    } catch (e) {
      console.log(e)
      showError(true)
    }
  }

  function setSession(session: Session) {
    const cookies = new Cookies()
    console.log(session)
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
        {error ? <p className='error'>Invalid PIN entered</p> : null}
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
