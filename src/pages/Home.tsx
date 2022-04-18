import '../styles/Home.css'
import { AddFormCategory, Button, CategoryCard, Loading, Navigation } from '../components'
import { useState, useEffect } from 'react'
import { fetchCategories } from '../api'
import { Category } from '../types'
import { useLocalStorage } from '../util/UseLocalStorage'

export default function Home() {
  const [AUTHED, setAuthed] = useLocalStorage("authed", false);
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
            {AUTHED ? <AddFormCategory /> : null}
            {categories.length &&
              categories.map((c) => {
                return <CategoryCard key={c.id} {...c} />
              })}
          </div>
          <div onClick={() => {setAuthed(!AUTHED); location.reload();}}>
            <Button text={"Toggle admin mode"} />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}
