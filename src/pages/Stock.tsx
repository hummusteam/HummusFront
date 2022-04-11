import '../styles/Stock.css'
import { Navigation, StockTable } from '../components'
import { useState, useEffect } from 'react'
import data from "../data.json";

export default function Cart() {
  const banner = 'https://www.nestleprofessionalmena.com/sites/default/files/2020-05/Vision%20banner.png'

  return (
    <div className="app-container ">
      <Navigation url={banner} />
        <StockTable data={data}/>
    </div>
  )
}
