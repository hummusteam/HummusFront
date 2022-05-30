import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import '../styles/Meta.css'
import { Session } from '../types'

export default function Meta() {
  const cookies = new Cookies()
  const session: Session = cookies.get('_session')

  return (
    <div className='metaContainer'>
      <div><b>{session?.table}</b><div>Table Number</div></div>
      <div><b>{session?.password}</b><div>Table PIN</div></div>
    </div>
  )
}
