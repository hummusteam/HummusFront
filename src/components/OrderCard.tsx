import '../styles/OrderCard.css'
import Button from './Button'

export default function OrderCard() {
  return (
    <div className="orderCard">
      <h1>{'Order #1'}</h1>

      <div className="orderCard-orderItems">
        <div className="title">
          <h2>{'Steak'}</h2>
          <h2>
            <small>Qty</small> {'1'}
          </h2>
        </div>

        <div className="orderItem-extras">
          <ul className="leaders">
            <li>
              <span>Potato</span>
              <span>10</span>
            </li>
            <li>
              <span>Potato</span>
              <span>4</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="orderCard-btns">
        <Button text="Prepare" />
        <Button text="Complete" />
      </div>
    </div>
  )
}
