import '../styles/MenuItemCard.css'
import { MenuItem } from '../types'

export default function MenuItemCard(menuItem: MenuItem) {
  return (
    <div className="menu-item-container">
      <h1>{menuItem.name}</h1>
      <h3>{menuItem.price}</h3>
      <h3></h3>
    </div>
  )
}
