import Ingredient from './Ingredient'
import MenuItem from './MenuItem'
import Order from './Order'

export default interface ProperOrder {
  id: string
  original: Order
  dateTimeCreated: string
  orderItems: ProperOrderItem[]
  orderStatus: number
  description: string
}

interface ProperOrderItem {
  id: string
  dateTimeCreated: string
  menuItem: MenuItem
  allergyId: string[]
  description: string
  extraIngredients: ProperIngredient[]
}

interface ProperIngredient {
  ingredient: Ingredient
  qty: number
}
