import '../styles/Home.css'
import { CartCurrentOrder, AddFormCategory, CategoryCard, Loading, Navigation } from '../components'
import { useState, useEffect } from 'react'
import { fetchCategories } from '../api'
import { Category } from '../types'

const AUTHED = false

export default function Cart() {
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
                    <CartCurrentOrder />


                </div>
            ) : (
                <Loading />
            )}
        </>
    )
}
