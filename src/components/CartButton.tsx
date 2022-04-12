import '../styles/CartButton.css'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

export default function CartButton() {
  return (
    <Link to="/cart">
      <div className="cartButtonContainer">
        <FontAwesomeIcon icon={faCartShopping} />
        <div>Cart</div>
      </div>
    </Link>
  )
}
