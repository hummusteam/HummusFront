import React, { useState, useEffect } from 'react'
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

export default async function putMenuItems(obj: MenuItem) {
  
  const menuitem = Object.values(obj)[0]
  
  const config = {
    headers: { "Content-Type": "application/json" }
  }
  
  const body = { 
    id : menuitem.id,
    name : menuitem.data.name,
    price : menuitem.data.price,
    image : menuitem.data.image,
    ingredientIds : menuitem.data.ingredientIds,
  }
  const response = await axios.put('https://menuapi.tycho.dev/MenuItem', body, config)
  console.log(response)
  console.log('Hello')
}
