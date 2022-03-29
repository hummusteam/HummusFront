import '../styles/CategoryCard.css'
import { Category } from '../types'
import EditFormCategories from './EditFormCategories'

const AUTHED = false

export default function CategoryCard(category: Category) {
  return (
    <div className="category-card-container" style={{ backgroundImage: `url(${category.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {AUTHED ? <EditFormCategories {...category} /> : null}
      <a href={`/menu?category=${category.id}`}>
        <div className="big-category-card">{category.name}</div>
      </a>
    </div>
  )
}
