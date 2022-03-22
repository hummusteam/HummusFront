import '../styles/MenuItemCard.css'
import { MenuItem } from '../types'
import EditFormMenuItem from './EditFormMenuItem'

export default function MenuItemCard(menuItem: MenuItem) {  
  return (
    <div className="menu-item-container" style={{ backgroundImage: `url(${menuItem.data.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <EditFormMenuItem obj={menuItem} />
      <div className="menu-item-inner-container"> 
        <h1>{menuItem.data.name}</h1>
        <h2>{menuItem.data.price}</h2>
      </div>
    </div>
  )
}
