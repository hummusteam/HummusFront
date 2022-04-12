import '../styles/Stock.css'
import { Navigation, StockTable } from '../components'
import { useState, useEffect } from 'react'
import { fetchIngredients } from '../api'
import { Ingredient } from '../types'



export default function Cart() {
  
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  
  useEffect(() => {
    fetchIngredients().then(setIngredients)
  }, [])
  
  const banner = 'https://www.nestleprofessionalmena.com/sites/default/files/2020-05/Vision%20banner.png'
  return (
    <div className="app-container ">
      <Navigation url={banner} />
        <StockTable />
    </div>
  )
}
