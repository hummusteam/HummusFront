import { ProperOrder } from '../types'
import { v4 as uuid } from 'uuid'
import Button from './Button'
import '../styles/OrderCard.css'
import { useEffect, useState } from 'react'

export default function OrderCard({ index, properOrder, onStatusUpdate }: { index: number; properOrder: ProperOrder; onStatusUpdate: any }) {
  const [status, setStatus] = useState<number>(properOrder.orderStatus)

  useEffect(() => {
    setTimeout(() => document.getElementById(properOrder.id).classList.remove('loaded'), 7500)
  }, [])

  function prepare() {
    const order = properOrder.original
    order.orderStatus = 1
    setStatus(1)
    onStatusUpdate(order)
  }

  function complete() {
    const order = properOrder.original
    order.orderStatus = 2
    setStatus(2)
    onStatusUpdate(order)
  }

  return status != 2 ? (
    <div id={properOrder.id} className="orderCard loaded">
      <h1>Order #{index}</h1>
      <p>Status &nbsp; {status}</p>

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

      {properOrder.description ? (
        <div className="orderCard-note">
          <p>
            <i>
              <b>Note:</b> &nbsp; {properOrder.description}
            </i>
          </p>
        </div>
      ) : null}

      <div className="orderCard-btns">
        {status == 0 ? (
          <div onClick={prepare}>
            <Button text="Prepare" />
          </div>
        ) : null}

        {status == 1 ? (
          <div onClick={complete}>
            <Button text="Complete" />
          </div>
        ) : null}
      </div>
    </div>
  ) : null
}
