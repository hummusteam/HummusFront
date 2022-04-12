import '../styles/Stock.css'
import { Navigation, StockTable } from '../components'

export default function Stock() {
  const banner = 'https://www.nestleprofessionalmena.com/sites/default/files/2020-05/Vision%20banner.png'

  return (
    <div className="app-container ">
      <Navigation url={banner} />
      <StockTable />
    </div>
  )
}
