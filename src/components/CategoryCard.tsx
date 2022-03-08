import '../styles/CategoryCard.css';
import { Link } from 'react-router-dom';

interface Category {
  name: string;
  title: string;
  url: string;
}

export default function CategoryCard(category: Category) {
  return (
    <Link to={`/menu?category=${category.name}`}>
      <div
        className="category-card-container big-category-card"
        style={{
          backgroundImage: `url(${category.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {category.title}
      </div>
    </Link>
  );
}
