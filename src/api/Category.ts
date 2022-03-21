import axios from 'axios'
import { Category } from '../types'

type ApiCategory = {
  id: string
  dateTimeCreated: string
  name: string
  image: string
}

export default async function fetchCategories(): Promise<Category[]> {
  const putUrl = 'https://menuapi.tycho.dev/Category'
  const data = await axios
    .get(putUrl)
    .then((res) => res.data)
    .catch(console.log)

  return data.map((c: ApiCategory) => {
    return {
      putUrl: putUrl,
      id: c.id,
      data: {
        name: c.name,
        image: c.image,
      },
    }
  })
}
