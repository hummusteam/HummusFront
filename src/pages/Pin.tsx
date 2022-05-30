import { useState } from 'react'
import { startSession } from '../api'
import { Button, Navigation } from '../components'
import { useLocalStorage } from '../util/UseLocalStorage'
import '../styles/Pin.css'

export default function Pin() {
  const [pin, setPin] = useState<string>(null)
  const [AUTHED, setAuthed] = useLocalStorage('authed', false)

  function generateSession() {
    startSession().then((session) => {
      setPin(session.password)
    })
  }

  return (
    <div className="app-container">
      <Navigation />

      <main>
        <div className="pin-container">
          {AUTHED ? (
            <div className="inner-pin-container">
              <h1>Signin</h1>
              <div className="input">
                <label htmlFor="username">Username</label>
                <input className="edit-form-input" name="username" id="username" />
              </div>
              <div className="input">
                <label htmlFor="password">Password</label>
                <input className="edit-form-input" name="password" id="password" />
              </div>

              <div className="btns">
                <div
                  className="btn"
                  onClick={() => {
                    setAuthed(!AUTHED)
                    location.reload()
                  }}
                >
                  <Button text="Login" />
                </div>
              </div>
            </div>
          ) : (
            <div className="inner-pin-container">
              <h1>Customer PIN</h1>
              <div className="pin">{pin}</div>
              <div className="btns">
                <div className="btn" onClick={generateSession}>
                  <Button text="Generate" />
                </div>
                <div
                  className="btn"
                  onClick={() => {
                    setAuthed(!AUTHED)
                    location.reload()
                  }}
                >
                  <Button text="Logout" />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
