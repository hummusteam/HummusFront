import Ingredient from './Ingredient'
import MenuItem from './MenuItem'

export default interface ProperOrder {
  id: string
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
