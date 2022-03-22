import '../styles/MenuItemCard.css'
import { MenuItem } from '../types'

export default function MenuItemCard(menuItem: MenuItem) {
  return (
    <div className="menu-item-container" style={{ backgroundImage: `url(${menuItem.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h1>{menuItem.name}</h1>
      <h2>{menuItem.price}</h2>
      <h3></h3>
    </div>
  )
}
