import '../styles/Menu.css'
import { Navigation, SmallCategoryCard, MenuItemCard, Loading, Button, AddFormMenuItem, AddFormCategory, Meta, CartButton, FeedbacksFooter } from '../components'
import { useState, useEffect } from 'react'
import { Category, Ingredient, MenuItem } from '../types'
import { fetchCategories, fetchIngredients, fetchMenuItemsByCategory } from '../api'
import { Link, useSearchParams } from 'react-router-dom'
import { useLocalStorage } from '../util/UseLocalStorage'
import Cookies from 'universal-cookie'

export default function Menu() {
  const [categories, setCategories] = useState<Category[]>([])
  const [menuItems, setMenuItem] = useState<MenuItem[]>([])
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [searchParams, _] = useSearchParams()
  const categoryId = searchParams.get('category')
  const [AUTHED, setAuthed] = useLocalStorage('authed', false)

  useEffect(() => {
    if (!new Cookies().get('_session')) {
      window.location.replace('/welcome')
    }

    fetchMenuItemsByCategory(categoryId).then(setMenuItem)
    fetchCategories().then(setCategories)
    fetchIngredients().then(setIngredients)
  }, [])

  return (
    <>
      {menuItems?.length != 0 || categories?.length != 0 ? (
        <div className="menu-container">
          <Navigation />
          <Meta />

          <div className="inner-menu-container">
            <div className="menu-carousel category-carousel">
              <div className="menu-carousel-inner">
                {categories.length != 0 &&
                  categories?.map((c) => {
                    return <SmallCategoryCard key={c.id} {...c} />
                  })}
              </div>
            </div>

            <div className="menu-items">
              {AUTHED ? <AddFormMenuItem categoryId={categoryId} ingredients={ingredients} /> : null}

              {menuItems?.length != 0 &&
                menuItems?.map((m) => {
                  return <MenuItemCard key={m.id} menuItem={m} ingredients={ingredients} />
                })}
            </div>

            <CartButton />

            <FeedbacksFooter />

            <div
              onClick={() => {
                setAuthed(!AUTHED)
                location.reload()
              }}
            >
              Admin mode
            </div>

          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}
