import { useState } from 'react'
import { Button, Navigation } from '../components'
import '../styles/Pin.css'
import { useLocalStorage } from '../util/UseLocalStorage'

export default function Pin() {
  const banner = 'https://www.nestleprofessionalmena.com/sites/default/files/2020-05/Vision%20banner.png'
  const [pin, setPin] = useState<number>(null)
  const [AUTHED, setAuthed] = useLocalStorage('authed', false)

  return (
    <div className="app-container">
      <Navigation url={banner} />

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
              <h1>Customer Pin</h1>
              <div className="pin">{pin}</div>
              <div className="btns">
                <div className="btn" onClick={() => setPin(Math.floor(Math.random() * 9999))}>
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
