import Editable from './Editable'

export default interface MenuItem extends Editable {
  data: {
    name: string
    price: number
    image: string
    ingredientIds: string[]
  }
}
