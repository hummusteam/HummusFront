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
                <div className="orderscontainer">
                    <div >
                        <Select options={options} />

                    </div>
                </div>

            </div>
        </>
    )
}
