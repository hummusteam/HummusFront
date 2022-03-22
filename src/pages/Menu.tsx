import '../styles/Menu.css'
import { Navigation, SmallCategoryCard, MenuItemCard, Loading, Button } from '../components'
import { useState, useEffect } from 'react'
import { Category, MenuItem } from '../types'
import { fetchCategories, fetchItemByCategory, fetchMenuItems } from '../api'
import { useSearchParams } from 'react-router-dom'
import EditableForm from '../components/EditForm'

export default function Menu() {
  const banner = 'https://www.nestleprofessionalmena.com/sites/default/files/2020-05/Vision%20banner.png'
  const [categories, setCategories] = useState<Category[]>([])
  const [menuItems, setMenuItem] = useState<MenuItem[]>([])
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryId = searchParams.get('category')

  useEffect(() => {
    fetchItemByCategory(categoryId).then(setMenuItem)
    fetchCategories().then(setCategories)
  }, [])

  return (
    <>
      {menuItems.length || categories.length ? (
        <div className="menu-container">
          <Navigation url={banner} />

          <div className="inner-menu-container">
            <div className="menu-carousel">
              <div className="menu-carousel-inner">
                {categories.length &&
                  categories.map((c) => {
                    return <SmallCategoryCard key={c.id} {...c} />
                  })}
                <Button text={'Add new category'} />
              </div>
            </div>

            <div className="menu-items">
              {menuItems.length &&
                menuItems.map((m) => {
                  return <MenuItemCard key={m.id} {...m} />
                })}
              <Button text={'Add new menu item'} />
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}
