import axios from 'axios'
import { Ingredient } from '../types'

export async function fetchIngredients(): Promise<Ingredient[]> {
  return await axios
    .get('https://inventoryapi.tycho.dev/Ingredient')
    .then((res) => res.data)
    .catch(console.log)
}

export async function fetchIngredientById(ingredient: string): Promise<Ingredient> {
  return await axios
    .get('https://inventoryapi.tycho.dev/Ingredient/' + ingredient)
    .then((res) => res.data)
    .catch(console.log)
}

export async function putIngredient(ingredient: Ingredient) {
  console.log(ingredient)
  await axios
    .put('https://inventoryapi.tycho.dev/Ingredient', ingredient, {
      headers: { 'Content-Type': 'application/json' },
    })
    .catch(console.log)
}

export async function postIngredient(ingredient: Ingredient) {
  console.log(ingredient)
  await axios
    .post('https://inventoryapi.tycho.dev/Ingredient', ingredient, {
      headers: { 'Content-Type': 'application/json' },
    })
    .catch(console.log)
}

export async function deleteIngredient(ingredient: Ingredient) {
  await axios.delete('https://inventoryapi.tycho.dev/Ingredient', { data: ingredient }).catch(console.log)
}
