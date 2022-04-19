import { useEffect, useState } from 'react'
import { BrowserRouter, Router, useParams } from 'react-router-dom'
import { useLocalStorage } from '../util/UseLocalStorage'
import { startSession } from '../api/Sessions'
import Cookies from 'universal-cookie'
import { Session } from '../types'

export default function Welcome() {
  const { tableId } = useParams()
  const [session, setSession] = useLocalStorage('session', null)

  useEffect(() => {
    startSession(tableId).then((session) => {
      setSession(session)
      const cookies = new Cookies()
      cookies.set('_session', session, { path: '/' })
      window.location.replace('/')
    })
  }, [])

  return <p></p>
}
