import { ProperOrder } from '../types'
import { v4 as uuid } from 'uuid'
import Button from './Button'
import '../styles/OrderCard.css'

export default function OrderCard({ index, properOrder }: { index: number; properOrder: ProperOrder }) {
  return (
    <div className="orderCard">
      <h1>Order #{index}</h1>

      <div className="orderCard-orderItems">
        {properOrder.orderItems?.length != 0 &&
          properOrder.orderItems.map((item) => {
            return (
              <>
                <div key={uuid()} className="title">
                  <h2>{item.menuItem?.name}</h2>
                  <h2>
                    <small>Qty</small> {'1'}
                  </h2>
                </div>

                <div className="orderItem-extras">
                  <ul className="leaders">
                    {item?.extraIngredients?.length != 0 &&
                      item?.extraIngredients.map((ingredient) => {
                        return ingredient.ingredient ? (
                          <li key={uuid()}>
                            <span>{ingredient.ingredient.name}</span>
                            <span>{ingredient.qty}</span>
                          </li>
                        ) : null
                      })}
                  </ul>
                </div>
              </>
            )
          })}
      </div>

      <div className="orderCard-btns">
        <Button text="Prepare" />
        <Button text="Complete" />
      </div>
    </div>
  )
}
