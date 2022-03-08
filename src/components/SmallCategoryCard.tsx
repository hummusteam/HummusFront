import "../styles/CategoryCard.css";

interface Category {
  title: string;
  url: string;
}

export default function SmallCategoryCard(category: Category) {
  return (
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
  );
}
