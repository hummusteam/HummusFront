import axios from 'axios'
import { Category } from '../types'

export default async function fetchCategories(): Promise<Category[]> {
  return await axios
    .get('https://menuapi.tycho.dev/Category')
    .then((res) => res.data)
    .catch(console.log)
}
