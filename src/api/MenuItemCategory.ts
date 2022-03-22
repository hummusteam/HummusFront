import axios from 'axios'
import { MenuItem } from '../types'

type ApiMenuItem = {
  id: string
  dateTimeCreated: string
  name: string
  price: number
  image: string
  category: string
  ingredientIds: string[]
}

export default async function fetchItemByCategory(category: string | null): Promise<MenuItem[]> {
  const data: ApiMenuItem[] = await axios
    .get('https://menuapi.tycho.dev/MenuItem/GetByCategory/' + category)
    .then((res) => res.data)
    .catch(console.log)

  return data.map((d: ApiMenuItem) => {
    return {
      putUrl: 'https://menuapi.tycho.dev/MenuItem',
      id: d.id,
      data: {
        name: d.name,
        image: d.image,
        price: d.price,
        ingredientIds: d.ingredientIds,
      },
    }
  })
}
