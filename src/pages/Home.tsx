import '../styles/Home.css'
import { AddFormCategory, CategoryCard, Loading, Navigation } from '../components'
import { useState, useEffect } from 'react'
import { createSessionFromTable, fetchCategories } from '../api'
import { Category, Session } from '../types'
import Cookies from 'universal-cookie'

const AUTHED = false

export default function Home() {
  const banner = 'https://www.nestleprofessionalmena.com/sites/default/files/2020-05/Vision%20banner.png'
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetchCategories().then(setCategories)

    // TEMPORARY
    createSessionFromTable(123).then((session) => {
      const cookies = new Cookies()
      cookies.set('_session', session)
    })
  }, [])

  return (
    <>
      {categories.length != 0 ? (
        <div className="app-container">
          <Navigation url={banner} />

          <div className="app-canvas">
            {AUTHED ? <AddFormCategory /> : null}
            {categories.length &&
              categories.map((c) => {
                return <CategoryCard key={c.id} {...c} />
              })}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}
