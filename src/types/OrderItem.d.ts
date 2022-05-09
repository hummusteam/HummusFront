export default interface OrderItem {
  id: string
  dateTimeCreated: string
  menuItemId: string
  allergyId: string[]
  description: string
  extraIngredients: { [id: string] : number }
}
