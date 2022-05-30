import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import '../styles/Meta.css'
import { Session } from '../types'

export default function Meta({ table, pin }: { table: number, pin: number }) {
  const cookies = new Cookies()
  const session: Session = cookies.get('_session')

  return (
    <div className='metaContainer'>
      <div><b>{session?.table}</b>	&nbsp; Table Number</div>
      <div><b>{session?.password}</b> &nbsp; Table PIN</div>
    </div>
  )
}
