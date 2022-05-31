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

  function serve() {
    setStatus(3)
  }

  console.log(status)

  return status != 3 ? (
    <div id={properOrder.id} className="orderCard loaded">
      <div className={status == 0 ? 'incoming' : status == 1 ? 'inprep' : 'outgoing'}>
        <h3>{status == 0 ? 'On standby' : status == 1 ? 'In preparation' : 'Ready to serve'}</h3>
      </div>

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

        {status == 2 ? (
          <div onClick={serve}>
            <Button text="Serve" />
          </div>
        ) : null}
      </div>
    </div>
  ) : null
}
