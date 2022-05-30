import '../styles/Home.css'
import { Navigation } from '../components'
import { useState, useEffect } from 'react'
import { fetchMenuItems } from '../api'
import { MenuItem } from '../types'

export default function Ingredients() {
  const [menuItems, setMenuItem] = useState<MenuItem[]>([])
  useEffect(() => {
    fetchMenuItems().then(setMenuItem)
  }, [])

  return (
    <div className="app-container ">
      <Navigation />

      <div className="app-canvas">
        {menuItems.length &&
          menuItems.map((c) => {
            return (
              <div>
                <h1>{c.name}</h1>
                <p>ID: {c.id}</p>
                <p>{c.price} $</p>
              </div>
            )
          })}
      </div>
    </div>
  )
}
