import "../styles/CategoryCard.css";

interface Category {
  title: string;
  url: string;
}

export default function CategoryCard(category: Category) {
  return (
    <div
      className="category-card-container"
      style={{
        backgroundImage: `url(${category.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {category.title}
    </div>
  );
}
