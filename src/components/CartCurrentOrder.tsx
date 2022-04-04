import React from 'react'
import '../styles/CurrentOrder.css'
import Select from 'react-select'
import { Component } from 'react'

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

export default function CartCurrentOrder() {
    return (
        <>
            <div>
                <div className="orders-container">

                    <div className="generic">
                        <div className='my-orders'>

                        </div>
                    </div>
                    <div className="generic">
                        <div className="previous-orders">
                            <Select options={options} />
                        </div>
                    </div>
                    <div className="generic">
                        <div className="notes">
                            <input className="e-input" type="text" placeholder="Notes" />
                        </div>
                    </div>
                    <div className="generic">
                        <div className="Botton">
                            <button type="submit" className="btn">
                                Place order
                            </button>
                            <button type="button" className="btn">
                                Payment
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
