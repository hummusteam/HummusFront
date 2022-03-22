import '../styles/CategoryCard.css'
import { Category } from '../types'
import EditFormCategories from './EditFormCategories'

export default function CategoryCard(category: Category) {
  return (
    <div className="category-card-container" style={{ backgroundImage: `url(${category.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <EditFormCategories {...category} />
      <a href={`/menu?category=${category.id}`}>
        <div className="big-category-card">{category.name}</div>
      </a>
    </div>
  )
}
