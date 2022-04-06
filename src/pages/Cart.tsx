// import '../styles/Home.css'
import { CartCurrentOrder, AddFormCategory, CategoryCard, Loading, Navigation } from '../components'
import { useState, useEffect } from 'react'
import { fetchCategories, fetchMenuItemsByCategory } from '../api'
import { Category, MenuItem } from '../types'
import { useSearchParams } from 'react-router-dom'


export default function Cart() {
    return (
        <>
            {<CartCurrentOrder />}
        </>
    )
}
