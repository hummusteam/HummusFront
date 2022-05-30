import '../styles/Stock.css'
import { Navigation, StockTable } from '../components'

export default function Stock() {
  return (
    <div className="app-container ">
      <Navigation />
      <StockTable />
    </div>
  )
}
