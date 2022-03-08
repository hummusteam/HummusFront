import "../styles/CategoryCard.css";
import { useNavigate } from "react-router-dom";

interface Category {
  name: string;
  title: string;
  url: string;
}

export default function SmallCategoryCard(category: Category) {
  const navigate = useNavigate();
  const redirect = () => {
    navigate(`?category=${category.name}`);
  };

  return (
    <div
      className="category-card-container small-category-card"
      style={{
        backgroundImage: `url(${category.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onClick={redirect}
    >
      {category.title}
    </div>
  );
}
