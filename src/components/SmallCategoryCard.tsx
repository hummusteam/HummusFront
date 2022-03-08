import '../styles/CategoryCard.css'
import { Link } from 'react-router-dom'
import { Category } from '../types'

export default function SmallCategoryCard(category: Category) {
  return (
    <Link to={`/menu?category=${category.id}`}>
      <div className="category-card-container small-category-card" style={{ backgroundImage: `url(${category.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {category.name}
      </div>
    </Link>
  )
}
