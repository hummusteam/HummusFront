import '../styles/Menu.css'
import { Navigation, SmallCategoryCard, MenuItemCard } from '../components'
import { useState, useEffect } from 'react'
import { Category, MenuItem } from '../types'
import { fetchCategories, fetchMenuItems } from '../api'

export default function Menu() {
  const banner = 'https://www.nestleprofessionalmena.com/sites/default/files/2020-05/Vision%20banner.png'
  const [categories, setCategories] = useState<Category[]>([])
  const [menuItems, setMenuItem] = useState<MenuItem[]>([])

  useEffect(() => {
    fetchCategories().then(setCategories)
    fetchMenuItems().then(setMenuItem)
  }, [])

  return (
    <div className="menu-container">
      <Navigation url={banner} />

      <div className="inner-menu-container">
        <div className="menu-carousel">
          <div className="menu-carousel-inner">
            {categories.length &&
              categories.map((c) => {
                return <SmallCategoryCard key={c.id} id={c.id} name={c.name} image={c.image} />
              })}
          </div>
        </div>

        <h1>Menu Items</h1>

        <div className="menu-items">
          {menuItems.length &&
            menuItems.map((m) => {
              return <MenuItemCard key={m.id} id={m.id} name={m.name} price={m.price} image={m.image} />
            })
          }
        </div>
      </div>
    </div>
  )
}
