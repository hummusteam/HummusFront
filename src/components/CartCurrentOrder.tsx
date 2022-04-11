
import '../styles/CurrentOrder.css'
import Select from 'react-select'
import Cookies from 'universal-cookie'
import { OrderItem, Order, MenuItem } from '../types'
import { fetchMenuItemByID } from '../api/MenuItems'
import { useEffect, useState } from 'react'

// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
// ]

// let UnprocessedOrderItem = fetchMenuItemsByID(unProcessedOrder.menuItemId);
// let fa = JSON.stringify(UnprocessedOrderItem);
// let ta: MenuItem = JSON.parse(fa);

// console.log(ta.name);

export default function CartCurrentOrder() {

    const [menuItems, setMenuItems] = useState<MenuItem[]>([])
    const [orderItems, setOrderItems] = useState<OrderItem[]>([])

    async function fatchAllItem() {

    }
    useEffect(() => {
        let cartCookies = new Cookies();
        if (cartCookies.get('_order')) {
            let storedFullOrder: OrderItem[] = cartCookies.get('_order');
            let FetchedMenueItems: MenuItem[] = [];
            for (let i = 0; i < storedFullOrder.length; i++) {
                fetchMenuItemByID(storedFullOrder[i].menuItemId).then(
                    (data) => {
                        // console.log(data);

                        // FetchedMenueItems.push(data);
                        // if (i == storedFullOrder.length) {
                        //     setMenuItems(FetchedMenueItems)
                        // }


                        // menuItems.concat(data)
                        // setMenuItems(FetchedMenueItems);
                        setMenuItems(varr => [...varr, data]);
                        console.log("inside use effect")
                        console.log(menuItems)
                    }
                );
            }

        }
    }, [])



    return (
        <>
            <div>
            </div>
            <div className="orders-container">
                <div className="generic">
                    <div className='my-orders'>

                        {
                            menuItems.length != 0 && menuItems.map((m) => {
                                console.log("jsx element")
                                return (<div key={m.id} >{m.name} </div>);
                            })
                        }
                    </div>
                </div>

                <div className="generic">
                    <div className="previous-orders">
                        {/* <Select options={options} /> */}
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
        </>
    )
}


