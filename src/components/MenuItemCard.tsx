import '../styles/MenuItemCard.css'
import { MenuItem } from '../types'
import EditFormMenuItem from './EditFormMenuItem'

const AUTHED = false

export default function MenuItemCard(menuItem: MenuItem) {
  return (
    <div className="menu-item-container" style={{ backgroundImage: `url(${menuItem.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {AUTHED ? <EditFormMenuItem {...menuItem} /> : null}
      <div className="menu-item-inner-container">
        <h1>{menuItem.name}</h1>
        <h2>{menuItem.price}</h2>
      </div>
    </div>
  )
}
