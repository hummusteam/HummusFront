import '../styles/Home.css'
import { AddFormCategory, CartButton, CategoryCard, Loading, Meta, Navigation, FeedbacksFooter } from '../components'
import { useState, useEffect } from 'react'
import { fetchCategories } from '../api'
import { Category, Session } from '../types'
import { useLocalStorage } from '../util/UseLocalStorage'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'

export default function Home() {
  const [AUTHED, setAuthed] = useLocalStorage('authed', false)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    if (!new Cookies().get('_session')) {
      window.location.replace('/welcome')
    }

    fetchCategories().then(setCategories)
  }, [])

  return (
    <>
      {categories?.length != 0 ? (
        <div className="categories-container">
          <Navigation />
          <Meta />

          <div className="inner-categories-container">
            <div className="categories-items">
              {AUTHED ? <AddFormCategory /> : null}

              {categories?.length &&
                categories?.map((c) => {
                  return <CategoryCard key={c.id} {...c} />
                })}
            </div>
          </div>

          <div className="inner-categories-container">
              <FeedbacksFooter />
          </div>

          <CartButton />

          {/* <div
            onClick={() => {
              setAuthed(!AUTHED)
              location.reload()
            }}
          >
            <Button text={'Toggle admin mode'} />
          </div>
          <Link to={'/cart'}>
            <p>
              <Button text="Go to cart" />
            </p>
          </Link> */}
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}
