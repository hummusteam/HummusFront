import axios from 'axios'
import { MenuItem } from '../types'

export default async function fetchItemByCategory(category: string | null): Promise<MenuItem[]> {
  const putUrl = 'https://menuapi.tycho.dev/MenuItem/GetByCategory'
  return await axios
    .get(putUrl + "/" + category)
    .then((res) => res.data)
    .catch(console.log)
}
