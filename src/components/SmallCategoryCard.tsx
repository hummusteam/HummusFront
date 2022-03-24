import '../styles/CategoryCard.css'
import { Category } from '../types'

export default function SmallCategoryCard(category: Category) {
  return (
    <a href={`/menu?category=${category.id}`}>
      <div className="category-card-container small-category-card" style={{ backgroundImage: `url(${category.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {category.name}
      </div>
    </a>
  )
}
