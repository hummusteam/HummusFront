import '../styles/Home.css'
import { AddFormCategory, CategoryCard, Loading, Navigation } from '../components'
import { useState, useEffect } from 'react'
import { fetchCategories } from '../api'
import { Category } from '../types'

export default function Home() {
  const banner = 'https://www.nestleprofessionalmena.com/sites/default/files/2020-05/Vision%20banner.png'
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetchCategories().then(setCategories)
  }, [])

  return (
    <>
      {categories.length != 0 ? (
        <div className="app-container">
          <Navigation url={banner} />

          <div className="app-canvas">
            <AddFormCategory />
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
