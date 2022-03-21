import Editable from "./Editable"

export default interface MenuItem extends Editable {
  name: string
  price: number
  image: string
}