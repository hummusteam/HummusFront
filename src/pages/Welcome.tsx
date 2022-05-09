import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { startSession } from '../api/Sessions'
import Cookies from 'universal-cookie'

export default function Welcome() {
  const { tableId } = useParams()

  useEffect(() => {
    startSession(tableId).then((session) => {
      const cookies = new Cookies()
      cookies.remove('_session')
      cookies.remove('_order')
      cookies.set('_session', session, { path: '/' })
      window.location.replace('/')
    })
  }, [])

  return <></>
}
