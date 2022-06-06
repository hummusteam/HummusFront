import '../styles/MenuItemCard.css'
import { Ingredient, MenuItem } from '../types'
import EditFormMenuItem from './EditFormMenuItem'
import { useLocalStorage } from '../util/UseLocalStorage'
import MenuItemDetails from './MenuItemDetails'

export default function MenuItemCard({ menuItem, ingredients }: { menuItem: MenuItem; ingredients: Ingredient[] }) {
  const [AUTHED, setAuthed] = useLocalStorage('authed', false)

  return (
    <div className="menu-item-container" style={{ backgroundImage: `url(${menuItem.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {AUTHED ? <EditFormMenuItem menuItem={menuItem} ingredients={ingredients} /> : null}

      <MenuItemDetails {...menuItem} />
      <div className="menu-item-inner-container">
        <h1>{menuItem.name}</h1>
        <h2>
          {menuItem.price} <small>€</small>
        </h2>
      </div>
    </div>
  )
}
