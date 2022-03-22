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
  const putUrl = 'https://menuapi.tycho.dev/MenuItem/GetByCategory'
  
  const data: ApiMenuItem[] = await axios
    .get(putUrl + '/' + category)
    .then((res) => res.data)
    .catch(console.log)

  return data.map((d: ApiMenuItem) => {
    return {
      putUrl: putUrl,
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
