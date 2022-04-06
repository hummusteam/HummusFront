
import '../styles/CurrentOrder.css'
import Select from 'react-select'
import Cookies from 'universal-cookie'
import { MenuItem } from '../types'
import MenuItemDetails from './MenuItemDetails'
import OrderItem from '../types/OrderItem'
import { useState } from 'react'
import Order from '../types/Order'


const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
]


// const menuItem = 0
// const [menuItems, setMenuItem] = useState<MenuItem[]>([])

// useEffect(() => {
//     fetchMenuItemsByCategory(categoryId).then(setMenuItem)
//     fetchCategories().then(setCategories)
//   }, [])

// const [fullOrders, setfullOrders] = useState<Order>()

const cookies = new Cookies()
if (cookies.get('_order')) {
    // Deserialize object from cookie using casting
    const order: OrderItem[] = cookies.get('_order')

    // cookies.set('_order', JSON.stringify(order))
    // console.log(order)
    console.log("NOUROOOOOOOOOOOOOOO")
    console.log(order[1].extraIngredients)
}

export default function CartCurrentOrder() {
    return (
        <>

            <div className="orders-container">
                <div className="generic">
                    <div className='my-orders'>

                    </div>
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

        </>
    )
}


