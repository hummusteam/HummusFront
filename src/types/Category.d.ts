import Editable from "./Editable"

export default interface Category extends Editable {
  data: {
    name: string
    image: string
  }
}
