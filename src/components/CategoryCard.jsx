import { Link } from "react-router-dom";

export default function CategoryCard({
  icon,
  title,
  description,
  link,
  className = "",
}) {
  return (
    <Link
      to={link}
      className={`category-card ${className}`}
    >
      <span className="category-icon">{icon}</span>

      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <span className="category-arrow">→</span>
    </Link>
  );
}