import '../styles/MenuItemCard.css'
import { MenuItem } from '../types'
import EditFormMenuItem from './EditFormMenuItem'
import {useLocalStorage} from "../util/UseLocalStorage";
import MenuItemDetails from './MenuItemDetails';

export default function MenuItemCard(menuItem: MenuItem) {
    const [AUTHED, setAuthed] = useLocalStorage("authed", false);

  return (
    <div className="menu-item-container" style={{ backgroundImage: `url(${menuItem.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {AUTHED ? <EditFormMenuItem {...menuItem} /> : null}
      <MenuItemDetails {...menuItem} />
      <div className="menu-item-inner-container">
        <h1>{menuItem.name}</h1>
        <h2>{menuItem.price}</h2>
      </div>
    </div>
  )
}
