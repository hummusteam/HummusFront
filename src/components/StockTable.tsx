import { MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react'
import { fetchIngredients, postIngredient } from '../api'
import { Ingredient } from '../types'
import EditIngredient from './EditIngredient'

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
    { key: 'name', label: 'Name' },
    { key: 'amount', label: 'Amount' },
    { key: 'allergens', label: 'Allergen' },
  ]

  const sortedData = useCallback(() => sortData({ tableData: ingredients, sortKey, reverse: sortOrder === 'desc' }), [ingredients, sortKey, sortOrder])

  function changeSort(key: SortKeys) {
    setSortOrder(sortOrder === 'ascn' ? 'desc' : 'ascn')

    setSortKey(key)
  }

  let nameInput = useRef(null)
  let amountInput = useRef(null)
  let allergenInput = useRef(null)

  async function createIngredient() {
    await postIngredient({
      name: nameInput.current.value,
      amount: amountInput.current.value,
      allergens: allergenInput.current.value.split(/[, ]+/),
    })
    window.location.reload()
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
        <td className="create-form-inputs">
          <div className="create-form">Name</div>
          <input className="create-form-input" ref={nameInput} />
        </td>

        <td className="create-form-inputs">
          <div className="create-form">Amount</div>
          <input className="create-form-input" ref={amountInput} />
        </td>

        <td className="create-form-inputs">
          <div className="create-form">Allergen</div>
          <input className="create-form-input" ref={allergenInput} />
        </td>

        <td className="btn" onClick={createIngredient}>
          Create
        </td>
      </tbody>

      <tbody>
        {sortedData().map((ingredient) => {
          return (
            <tr key={ingredient.id}>
              <td>{ingredient.name}</td>
              <td>{ingredient.amount}</td>
              <td>
                {ingredient.allergens.map((allergen) => {
                  return <p>{allergen}</p>
                })}
              </td>
              <td>
                <EditIngredient {...ingredient} />
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
