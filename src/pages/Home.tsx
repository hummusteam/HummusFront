import '../styles/Home.css'
import { AddFormCategory, Button, CartButton, CategoryCard, Loading, Meta, Navigation } from '../components'
import { useState, useEffect } from 'react'
import { fetchCategories } from '../api'
import { Category } from '../types'
import { useLocalStorage } from '../util/UseLocalStorage'
import { Link } from 'react-router-dom'

export default function Home() {
  const [AUTHED, setAuthed] = useLocalStorage('authed', false)
  const banner = 'https://www.nestleprofessionalmena.com/sites/default/files/2020-05/Vision%20banner.png'
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetchCategories().then(setCategories)
  }, [])

  return (
    <>
      {categories?.length != 0 ? (
        <div className="categories-container">
          <Navigation url={banner} />
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
