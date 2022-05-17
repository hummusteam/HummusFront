import axios from 'axios'
import { MenuItem } from '../types'

export async function fetchMenuItems(): Promise<MenuItem[]> {
  return await axios
    .get('https://menuapi.tycho.dev/MenuItem')
    .then((res) => res.data)
    .catch(console.log)
}

export async function fetchMenuItemsByCategory(category: string): Promise<MenuItem[]> {
  return await axios
    .get('https://menuapi.tycho.dev/MenuItem/GetByCategory/' + category)
    .then((res) => res.data)
    .catch(console.log)
}

export async function putMenuItem(item: MenuItem) {
  await axios
    .put('https://menuapi.tycho.dev/MenuItem', item, {
      headers: { 'Content-Type': 'application/json' },
    })
    .catch(console.log)
}

export async function postMenuItem(item: MenuItem) {
  await axios
    .post('https://menuapi.tycho.dev/MenuItem', item, {
      headers: { 'Content-Type': 'application/json' },
    })
    .catch(console.log)
}

export async function deleteMenuItem(item: MenuItem) {
  await axios.delete('https://menuapi.tycho.dev/MenuItem', { data: item }).catch(console.log)
}

export async function fetchMenuItemById(id: string): Promise<MenuItem> {
  return await axios.get('https://menuapi.tycho.dev/MenuItem/' + id)
    .then((res) => res.data)
    .catch(console.log)
}