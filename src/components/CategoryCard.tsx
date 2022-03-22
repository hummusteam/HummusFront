import '../styles/CategoryCard.css'
import { Category } from '../types'
import EditableForm from './EditableForm'

export default function SmallCategoryCard(category: Category) {
  return (
    <div className="category-card-container" style={{ backgroundImage: `url(${category.data.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <EditableForm obj={category} />
      <a href={`/menu?category=${category.id}`}>
        <div className="big-category-card">{category.data.name}</div>
      </a>
    </div>
  )
}
