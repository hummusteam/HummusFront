import "../styles/CategoryCard.css";
import { useNavigate } from "react-router-dom";

interface Category {
  name: string;
  title: string;
  url: string;
}

export default function CategoryCard(category: Category) {
  const navigate = useNavigate();
  const redirect = () => {
    console.log(category.name)
    navigate(`menu?category=${category.name}`);
  };

  return (
    <div
      className="category-card-container big-category-card"
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
