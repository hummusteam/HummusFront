import axios from 'axios'
import { MenuItem } from '../types'

<<<<<<< HEAD
export default async function fetchCategories(): Promise<MenuItem[]> {
  return await axios
    .get('https://menuapi.tycho.dev/MenuItem')
    .then((res) => res.data)
    .catch(console.log)
=======
export default async function fetchItems() : Promise<MenuItem[]> {
    return await axios.get("https://menuapi.tycho.dev/MenuItem").then(res => res.data).catch(console.log);
>>>>>>> 4b23d3e718029c29c2c3344905f36856ce623e44
}
