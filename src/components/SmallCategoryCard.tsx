import "../styles/CategoryCard.css";
import { Link } from "react-router-dom";

interface Category {
  name: string;
  title: string;
  url: string;
}

export default function SmallCategoryCard(category: Category) {
  return (
    <Link to={`/menu?category=${category.name}`}>
      <div
        className="category-card-container small-category-card"
        style={{
          backgroundImage: `url(${category.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {category.title}
      </div>
    </Link>
  );
}
