import '../styles/Menu.css'
import { Navigation, SmallCategoryCard, MenuItemCard } from '../components'
import { useState, useEffect } from 'react'
import { Category } from '../types'
import { fetchCategories } from '../api'

export default function Menu() {
  const banner = 'https://www.nestleprofessionalmena.com/sites/default/files/2020-05/Vision%20banner.png'
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetchCategories().then(setCategories)
  }, [])

  return (
    <div className="menu-container">
      <Navigation url={banner} />

      <div className="inner-menu-container">
        <div className="menu-carousel">
          <div className="menu-carousel-inner">
            {categories.length && categories.map(c => {
              return <SmallCategoryCard key={c.id} id={c.id} name={c.name} image={c.image} />
            })}
          </div>
        </div>

        <h1>Menu Items</h1>

        <div className="menu-items">
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
          <MenuItemCard />
        </div>
      </div>
    </div>
  )
}
