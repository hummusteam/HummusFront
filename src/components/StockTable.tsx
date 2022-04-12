import { MouseEventHandler, useCallback, useEffect, useState } from 'react'
import { fetchIngredients } from '../api'
import { Ingredient } from '../types'
import Button from './Button'

export default function SortableTable() {
  const [sortKey, setSortKey] = useState<SortKeys>('id')
  const [sortOrder, setSortOrder] = useState<SortOrder>('ascn')
  const [ingredients, setIngredients] = useState<Ingredient[]>([])

  useEffect(() => {
    fetchIngredients().then((data) => {
      setIngredients([...data])
    })
  }, [])
  
  type Data = typeof ingredients

  type SortKeys = keyof Data[0]

  type SortOrder = 'ascn' | 'desc'

  function sortData({ tableData, sortKey, reverse }: { tableData: Data; sortKey: SortKeys; reverse: boolean }) {
    if (!sortKey) return tableData

    const sortedData = ingredients.sort((a, b) => {
      return a[sortKey] > b[sortKey] ? 1 : -1
    })

    if (reverse) {
      return sortedData.reverse()
    }

    return sortedData
  }

  function SortButton({ sortOrder, columnKey, sortKey, onClick }: { sortOrder: SortOrder; columnKey: SortKeys; sortKey: SortKeys; onClick: MouseEventHandler<HTMLButtonElement> }) {
    return (
      <button onClick={onClick} className={`${sortKey === columnKey && sortOrder === 'desc' ? 'sort-button sort-reverse' : 'sort-button'}`}>
        ▲
      </button>
    )
  }

  const headers: { key: SortKeys; label: string }[] = [
    { key: 'id', label: 'ID' },
    { key: 'amount', label: 'Amount' },
    { key: 'name', label: 'Name' },
    { key: 'dateTimeCreated', label: 'Date' },
  ]

  const sortedData = useCallback(() => sortData({ tableData: ingredients, sortKey, reverse: sortOrder === 'desc' }), [ingredients, sortKey, sortOrder])

  function changeSort(key: SortKeys) {
    setSortOrder(sortOrder === 'ascn' ? 'desc' : 'ascn')

    setSortKey(key)
  }

  return (
    <table>
      <thead>
        <tr>
          {headers.map((row) => {
            return (
              <td key={row.key}>
                {row.label}{' '}
                <SortButton
                  columnKey={row.key}
                  onClick={() => changeSort(row.key)}
                  {...{
                    sortOrder,
                    sortKey,
                  }}
                />
              </td>
            )
          })}
        </tr>
      </thead>

      <tbody>
        {sortedData().map((ingredient) => {
          return (
            <tr key={ingredient.id}>
              <td>{ingredient.id}</td>
              <td>{ingredient.name}</td>
              <td>{ingredient.amount}</td>
              <td>{ingredient.dateTimeCreated}</td>
              <Button text={'Edit'} />
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
